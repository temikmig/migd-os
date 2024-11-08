import { FC } from 'react';
import css from './sun.module.css'; 

export const Cloud:FC = ({style}:any) => {
    return(
        <svg width="120px" height="90px" viewBox="0,0,256,196" style={style}>
            <g>
                <g transform="scale(0.54237,0.54237)">
                    <path d="M413.001,177.76c0,30.76 -24.94,55.7 -55.69,55.7h-224.69c-40.66,0 -73.62,-32.97 -73.62,-73.63c0,-39.693 31.836,-73.62 74,-73.62c0,-47.61 38.6,-86.21 86.22,-86.21c43.271,0 78.714,31.775 85.15,72.65c26.021,1.997 46.885,23.316 48.28,49.61c32.414,-2.736 60.35,22.876 60.35,55.5z" fillOpacity="0.54902" fill="#b4d3f0"></path>
                    <path d="M220.16,0.005c19.339,0.206 22.88,27.41 4.338,32.908c-29.853,8.852 -54.563,33.508 -60.643,66.729c-1.527,8.345 -7.8,15.565 -17.414,17.648c-27.444,5.916 -47.052,25.934 -54.602,49.947c-5.633,17.915 -31.961,14.576 -32.768,-4.186c-1.79,-41.572 31.129,-76.841 73.931,-76.841c-0.001,-47.822 39.008,-86.719 87.158,-86.205z" fillOpacity="0.74902" fill="#eef6ff"></path>
                    <path d="M137.781,132.54c-4.675,2.671 -9.488,0.585 -11.297,-3.313c-5.509,-11.863 -8.686,-24.74 -9.346,-37.855c-0.102,-2.033 1.338,-3.831 3.345,-4.164c3.385,-0.563 6.262,-0.793 8.432,-0.893c2.217,-0.102 4.075,1.616 4.175,3.833c0.517,11.474 3.282,22.366 7.861,32.242c1.72,3.72 0.39,8.12 -3.17,10.15z" fillOpacity="0.81961" fill="#b5d4f5"></path>
                    <path d="M301.174,59.369c0.879,2.684 1.629,5.429 2.244,8.225c0.549,2.496 -1.307,4.867 -3.862,4.892c-7.363,0.072 -14.417,1.643 -20.905,4.535c-3.7,1.65 -8.04,0.41 -10.17,-3.04c-2.56,-4.13 -0.86,-9.55 3.57,-11.53c10.988,-4.911 20.395,-5.665 25.157,-5.854c1.795,-0.072 3.407,1.064 3.966,2.772z" fillOpacity="0.81961" fill="#b5d4f5"></path>
                </g>
            </g>
        </svg>
    )
}