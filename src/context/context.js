import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

function GithubProvider({ children }) {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    // Keeping tracking of requests
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: '' })

    /**
     * Looking for a searched user
     */
    const searchGithubUser = async (user) => {
        // toggleError, set error back to default state when researching
        toggleError()
        setLoading(true)
        try {
            const resp = await axios.get(`${rootUrl}/users/${user}`)
            // console.log(resp.data);
            setGithubUser(resp.data);

            // Getting repos
            const { login, followers_url } = resp.data
            const repos = axios.get(`${rootUrl}/users/${login}/repos?per_page=100`);
            // console.log(repos.data);
            const followers = axios.get(`${followers_url}?per_page=100`);
            // console.log(followers.data);

            // Getting repos and followers data at the same time
            await Promise.allSettled([repos, followers]).then((results) => {
                // console.log(results);
                const [repos, followers] = results;
                const status = 'fulfilled';
                // Only getting data if both promises are fulfilled
                if (repos.status === status && followers.status === status) {
                    setRepos(results[0].value.data)
                    setFollowers(results[1].value.data)
                }
            });
        } catch (error) {
            toggleError(true, `No user with username ${user}`)
        } finally {
            checkRequests()
            setLoading(false)
        }
    }

    // check rate of requests remaining
    const checkRequests = () => {
        axios.get(`${rootUrl}/rate_limit`).then((data) => {
            let { remaining } = data.data.rate;
            // console.log(remaining);
            setRequests(remaining);
            if (remaining === 0) {
                // throw an error cuz there's no more remaining requests
                toggleError(true, "Sorry, you have no more hourly requests remaining.")
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    // error handling
    function toggleError(show = false, msg = '') {
        setError({ show, msg });
    };

    useEffect(() => {
        checkRequests();
    }, []);

    const valuesToShare = {
        githubUser,
        repos,
        followers,
        requests,
        error,
        loading,
        searchGithubUser,
    };

    return <GithubContext.Provider value={valuesToShare}>
        {children}
    </GithubContext.Provider>
};

export { GithubProvider, GithubContext };
