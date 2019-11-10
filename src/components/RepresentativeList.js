import React from 'react'

const RepresentativeList = officials => {
    const renderedList = officials.map(official => {
        return (
            <VideoItem
                key={video.id.videoId}
                onVideoSelect={onVideoSelect}
                video={video}
            />
        );
    });
    return <div className="ui relaxed divided list">{renderedList}</div>;
};
/*
const offices = data.offices.map(office => {
  return {
    ...office,
    officials: office.officialIndices.map(index => data.officials[index])
  }
})
*/

export default RepresentativeList;