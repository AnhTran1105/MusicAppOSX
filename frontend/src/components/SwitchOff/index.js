import { useRef } from 'react';

function SwitchOff() {
    const switchOff = useRef();
    const circleSwitchOff = useRef();
    const handleClick = () => {
        if (switchOff.current.style.fill !== 'var(--purple-primary)') {
            switchOff.current.style.fill = 'var(--purple-primary)';
            circleSwitchOff.current.setAttribute('cx', '16.5');
        } else {
            switchOff.current.style.fill = '#a0a0a0';
            circleSwitchOff.current.setAttribute('cx', '7.5');
        }
    };
    return (
        <svg onClick={handleClick} id="Layer_1" x="0px" y="0px" width="24px" height="15px" viewBox="0 0 24 15">
            <path
                ref={switchOff}
                id="Rectangle-8"
                className="st0"
                d="M7.5,0h9C20.6,0,24,3.4,24,7.5l0,0c0,4.1-3.4,7.5-7.5,7.5h-9C3.4,15,0,11.6,0,7.5l0,0 C0,3.4,3.4,0,7.5,0z"
                style={{ fill: '#a0a0a0' }}
            ></path>
            <circle
                id="Oval-2"
                className="st1"
                cx="7.5"
                cy="7.5"
                r="6.5"
                ref={circleSwitchOff}
                style={{
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    fill: '#ffffff',
                }}
            ></circle>
        </svg>
    );
}

export default SwitchOff;
