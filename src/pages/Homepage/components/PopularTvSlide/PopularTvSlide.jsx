import React from 'react'
import { responsive } from '../../../../constants/responsive'
import { Alert } from 'bootstrap'
import { usePopularTvQuery } from '../../../../Tvhooks/usePopularTv'
import TvSlider from '../../../../common/TvSlider/TvSlider'

const PopularTvSlide = () => {

    const { data, isError, error, isLoading } = usePopularTvQuery();
    console.log(data);
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (isError) {
        return <Alert variants="danger">{error.message}</Alert>
    }

    if (!data || !data.results || data.results.length === 0) {
        return <h1>No Series found</h1>;
    }

    return (

        <div>
            <TvSlider title={"Popular Series"} tvs={data?.results} responsive={responsive} />

        </div>
    )
}

export default PopularTvSlide