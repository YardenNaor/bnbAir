import React from 'react';
import ReactDOM from 'react-dom';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Stayousel } from 'react-responsive-carousel';

export function DemoStayousel() {
    return (
        <Stayousel>
            <div>
                <img src="assets/1.jpeg" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="assets/2.jpeg" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="assets/3.jpeg" />
                <p className="legend">Legend 3</p>
            </div>
        </Stayousel>
    );

}

// ReactDOM.render(<DemoStayousel />, document.querySelector('.demo-carousel'));
