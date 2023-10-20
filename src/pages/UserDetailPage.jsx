import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function UserDetailPage() {
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(''); // Default to an empty string
    const [countryList, setCountryList] = useState([]);
    const [offset, setOffset] = useState(0);
    const location = useLocation();
    const userDetail = location?.state?.user;

    useEffect(() => {
        let timer;
        if (!isPaused) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isPaused]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const time = (value) => (value < 10 ? `0${value}` : value);
        return `${time(hours)}:${time(minutes)}:${time(seconds)}`;
    };

    const handlePause = () => {
        setIsPaused((prevState) => !prevState);
    };

    const handleCountryChange = (e) => {
        const selected = e.target.value;
        setSelectedCountry(selected);

        if (selected) {
            fetchCountryTime(selected);
        }
    };

    const getCountryList = async () => {
        try {
            const response = await fetch('http://worldtimeapi.org/api/timezone');
            const data = await response.json();
            setCountryList(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCountryTime = async (selected) => {
        try {
            const response = await fetch(`http://worldtimeapi.org/api/timezone/${selected}`);
            const data = await response.json();
            setOffset(data.raw_offset);
        } catch (error) {
            console.error(error);
        }
    };

    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error('Error in fetching post data:', error);
            });
    }
    useEffect(() => {
        getCountryList();
        getPosts()
    }, []);
    const getCurrentTimeByCountry = () => {
        const currentTime = new Date(new Date().getTime() + offset * 3600);
        return currentTime.toLocaleTimeString();
    };
    useEffect(() => {
        getCurrentTimeByCountry()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])
    return (
        <div className='container'>
            <div className='user-wrapper'>
                <div className="row mb-3">
                    <div class="col-12">
                        <div className='header-section'>
                            <a className='btn btn-dark' href="/">Back</a>
                                <b>
                                 Country Time : {getCurrentTimeByCountry(selectedCountry)}
                                </b>
                            <div className='timer-wrapper'>
                                <div className="clock">
                                    {formatTime(time)}
                                </div>
                                <select className='btn-lg custom-dropdown' value={selectedCountry} onChange={handleCountryChange}>
                                    <option value="" disabled hidden>Select a Country</option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>

                                <button onClick={handlePause} className='btn btn-dark'>
                                    {isPaused ? 'Start' : 'Pause'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <div class="card user-info-card" >
                            <div class="card-body user-card">
                                <div>
                                    <p>Name: {userDetail.name}</p>
                                    <p>Username: {userDetail.username} | {userDetail?.company?.catchPhrase}</p>
                                </div>
                                <div>
                                    <p>{`Address : ${userDetail.address.street}, ${userDetail.address.city}`}</p>
                                    <p>Email: {userDetail.email} | {userDetail.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {posts.filter((post) => post.userId === userDetail.id).map((post) => (
                        <div className="col-md-6 col-lg-4" key={post.id}>
                            <div className='card'>
                                <div class="card-body">
                                    <h5 class="card-title">{post.title}</h5>
                                    <p class="card-text">{post.body}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserDetailPage;

