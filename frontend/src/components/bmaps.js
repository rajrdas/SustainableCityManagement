import React, { Component } from 'react';
import ReactBingmaps from 'react-bingmaps';

class Bmaps extends React.Component {

  render() {
    return (
            <div>
                <div>
                    <div>
                        <ReactBingmaps
                        center = {[13.0827, 80.2707]}
                        zoom = {4}
                        >
                        </ReactBingmaps>
                    </div>

                </div>
             </div>
    )
  }
};

export default Bmaps;