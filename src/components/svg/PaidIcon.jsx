import * as React from "react";
const PaidIcon = (props) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 485 485"
    style={{
      enableBackground: "new 0 0 485 485",
      height: props.size, // Sử dụng props size cho chiều cao
      width: props.size, // Sử dụng props size cho chiều rộng
      ...props.style,
    }}
    xmlSpace="preserve"
    {...props}
    
  >
    <g>
      <g>
        <path
          style={{
            stroke: "#000000",
            strokeMiterlimit: 10,
          }}
          d="M138.853,274.822v-64.61h27.573c3.094,0,5.929,0.637,8.508,1.911 c2.578,1.274,4.792,2.943,6.643,5.005c1.85,2.063,3.306,4.399,4.368,7.007c1.061,2.609,1.593,5.248,1.593,7.917 c0,2.853-0.5,5.583-1.501,8.19c-1.001,2.609-2.397,4.945-4.186,7.007c-1.79,2.063-3.958,3.701-6.506,4.914 c-2.548,1.214-5.369,1.82-8.463,1.82h-13.104v20.839H138.853z M153.776,240.97h12.194c1.759,0,3.276-0.758,4.55-2.275 c1.274-1.516,1.911-3.731,1.911-6.643c0-1.516-0.198-2.821-0.592-3.913c-0.395-1.092-0.925-2.002-1.592-2.73 c-0.668-0.728-1.426-1.258-2.275-1.592c-0.851-0.333-1.699-0.5-2.548-0.5h-11.648V240.97z"
        />
        <path
          style={{
            stroke: "#000000",
            strokeMiterlimit: 10,
          }}
          d="M213.563,210.212h13.468l23.569,64.61h-15.288l-5.005-14.469h-20.111 l-4.914,14.469h-15.288L213.563,210.212z M227.85,250.07l-7.553-22.841l-7.735,22.841H227.85z"
        />
        <path
          style={{
            stroke: "#000000",
            strokeMiterlimit: 10,
          }}
          d="M261.52,274.822v-64.61h14.924v64.61H261.52z"
        />
        <path
          style={{
            stroke: "#000000",
            strokeMiterlimit: 10,
          }}
          d="M293.369,274.822v-64.61h24.114c5.338,0,10.011,0.85,14.015,2.548 c4.004,1.699,7.354,4.004,10.055,6.916c2.699,2.912,4.732,6.325,6.098,10.237c1.365,3.913,2.047,8.085,2.047,12.513 c0,4.914-0.759,9.359-2.274,13.332c-1.518,3.974-3.686,7.371-6.507,10.192c-2.821,2.821-6.219,5.005-10.191,6.552 c-3.975,1.547-8.388,2.32-13.241,2.32H293.369z M334.501,242.426c0-2.851-0.38-5.444-1.138-7.78 c-0.76-2.335-1.865-4.353-3.321-6.052c-1.456-1.698-3.246-3.003-5.369-3.913c-2.124-0.91-4.521-1.365-7.189-1.365h-9.19v38.402 h9.19c2.73,0,5.156-0.485,7.28-1.456c2.123-0.97,3.897-2.32,5.323-4.049c1.425-1.729,2.517-3.761,3.276-6.097 C334.121,247.781,334.501,245.217,334.501,242.426z"
        />
      </g>
      <g>
        <path d="M485,371.939H0V113.061h485V371.939z M30,341.939h425V143.061H30V341.939z" />
      </g>
    </g>
  </svg>
);
export default PaidIcon;
