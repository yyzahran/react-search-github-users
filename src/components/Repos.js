import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
    const { repos } = useContext(GithubContext);

    const chartData = [
        {
            label: "HTML",
            value: "13"
        },
        {
            label: "CSS",
            value: "23"
        },
        {
            label: "JavaScript",
            value: "80"
        },
    ];

    const languages = repos.reduce((accumulator, item) => {
        // item is just every item in 'repos'
        const { language, stargazers_count } = item;
        if (!language) return accumulator;
        if (!accumulator[language]) {
            // accumulator[language] = 1
            accumulator[language] = {
                label: language,
                value: 1,
                stars: stargazers_count,
            }
        } else {
            // accumulator[language] += 1
            accumulator[language] = {
                ...accumulator[language],
                value: accumulator[language].value + 1,
                stars: accumulator[language].stars + stargazers_count,
            }
        }
        // console.log(accumulator);
        return accumulator;
    }, {})

    /**
     * Sort the langues by the highest 'value' property
     * Sorting the languages to get the most common 5 only
     * For pie3d
     */
    const mostUsed = Object.values(languages).sort((a, b) => {
        return b.value - a.value;
    }).slice(0, 5)

    // most stats per languages
    // for doughnut2d
    const mostPopular = Object.values(languages).sort((a, b) => {
        return b.stars - a.stars;
    }).map((item) => {
        return { ...item, value: item.stars }
    }).slice(0, 5);
    // console.log(mostPopular);

    // stars and forks for column abd ar charts
    let { stars, forks } = repos.reduce((accumulator, item) => {
        const { stargazers_count, name, forks } = item;
        accumulator.stars[stargazers_count] = { label: name, value: stargazers_count }
        accumulator.forks[forks] = {label: name, value: forks}
        return accumulator;
    }, {
        stars: {},
        forks: {},
    });

    stars = Object.values(stars).slice(-5).reverse()
    forks = Object.values(forks).slice(-5).reverse()
    // console.log(stars);

    // console.log(languages);
    return <section className='section'>
        <Wrapper className='section-center'>
            {/* This Example chart is just for reference */}
            <Doughnut2D data={mostPopular} />
            <Column3D data={stars} />
            <Bar3D data={forks} />
            <Pie3D data={mostUsed} />
        </Wrapper>
    </section>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
