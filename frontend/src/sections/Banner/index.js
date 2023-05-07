/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, useRef } from 'react';

let transformArr = ['next', 'last', 'add', 'first', 'previous', 'selected'];
let timeOut;

function Banner({ props }) {
    const [isBusy, setBusy] = useState(true);
    const itemsRef = useRef([]);
    const [time, setTime] = useState();
    const [isAuto, setAuto] = useState(true);

    const handleLeftTransformArr = () => {
        let lastItem = transformArr[5];
        transformArr.pop();
        transformArr.unshift(lastItem);
        itemsRef.current.map((item, i) => {
            for (const className of item.classList) {
                if (className.includes('gallery-item-')) {
                    item.classList.remove(className);
                    item.classList.add(`gallery-item-${transformArr[i]}`);
                }
            }
        });
        return transformArr;
    };

    const handleRightTransformArr = () => {
        let firstItem = transformArr[0];
        transformArr.shift();
        transformArr.push(firstItem);
        itemsRef.current.map((item, i) => {
            for (const className of item.classList) {
                if (className.includes('gallery-item-')) {
                    item.classList.remove(className);
                    item.classList.add(`gallery-item-${transformArr[i]}`);
                }
            }
        });
        return transformArr;
    };

    const handlePrevClick = () => {
        clearTimeout(timeOut);
        setAuto(false);
        timeOut = setTimeout(() => setAuto(true), 10000);
        handleLeftTransformArr();
        return () => {
            clearTimeout(timeOut);
        };
    };

    const handleNextClick = () => {
        clearTimeout(timeOut);
        setAuto(false);
        timeOut = setTimeout(() => setAuto(true), 10000);
        handleRightTransformArr();
        return () => {
            clearTimeout(timeOut);
        };
    };

    useEffect(() => {
        setBusy(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(props)]);

    useEffect(() => {
        let interval;
        interval = setInterval(() => setTime(Date.now()), 8000);
        if (isAuto) {
            transformArr = handleLeftTransformArr();
        }

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    return (
        <div className="container">
            <div className="gallery">
                <div className="gallery-container" style={{ height: '209.602px' }}>
                    <div className="osx-gallery-prev">
                        <button
                            className="osx-btn osx-carousel-control-prev button"
                            onClick={handlePrevClick}
                            tabIndex="0"
                        >
                            <i className="icon ic-go-left"></i>
                        </button>
                    </div>
                    {!isBusy && props
                        ? props.map((item, i) => (
                              <div
                                  key={i}
                                  ref={(el) => (itemsRef.current[i] = el)}
                                  className={`gallery-item gallery-item-${transformArr[i]}`}
                              >
                                  <div className="osx-card">
                                      <a title="" href={item.link}>
                                          <div className="osx-card-image">
                                              <figure className="image is-48x48">
                                                  <img src={item.banner} alt="" />
                                              </figure>
                                          </div>
                                          <div className="osx-card-content">
                                              <div className="title">{item.title}</div>
                                              <h3 className="subtitle">{item.subtitle}</h3>
                                          </div>
                                      </a>
                                  </div>
                              </div>
                          ))
                        : ''}

                    <div className="osx-gallery-next">
                        <button
                            className="osx-btn osx-carousel-control-next button"
                            onClick={handleNextClick}
                            tabIndex="0"
                        >
                            <i className="icon ic-go-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
