// import { useState } from "react"

// export function ImageSlider({ slides }) {
//     const [currentIdx, setCurrentIdx] = useState(0)

//     const goToPrevious = () => {
//         const isFirstSlide = currentIdx === 0
//         const newIndex = isFirstSlide ? 0 : currentIdx - 1
//         setCurrentIdx(newIndex)
//     }

//     const goToNext = () => {
//         const isLastSlide = currentIdx === slides.length - 1
//         const newIndex = isLastSlide ? slides.length - 1 : currentIdx + 1;
//         setCurrentIdx(newIndex)
//     }
//     const goToSlide = (slideIndex) => {
//         setCurrentIdx(slideIndex)
//     }

//     return (
//         <div className="image-slider">

//             <div className="arraw leftArraw" onClick={goToPrevious}>
//                 <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
//                     <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
//                 </svg>
//             </div>
//             <div className="arraw rightArraw" onClick={goToNext}>
//                 <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
//                     <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
//                 </svg>
//             </div>
//             <div className="slideStyle" style={{ backgroundImage: `url(${slides[currentIdx].url})` }}>
//                 <div className="dotContainer">
//                     {slides.map((slide, slideIndex) => {
//                         return <div key={slideIndex} className="dot" onClick={() => goToSlide(slideIndex)}>&#x25CF;</div>
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }