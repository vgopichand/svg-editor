// import { createRef, useEffect } from 'react';
import './App.css';
import Chart from './chart';
// import Logo from './logoComponent'
// import redLogo from './red.svg'
// import Red from './red';

function App() {
  // const svgRef = createRef()
  // const redRef = createRef()


  // const mouseEventFired = (event) => {
  //   console.log(event)
  //   // event.target.scrollIntoView({ behavior: "smooth" })
  //   // alert(event)
  // }

  // useEffect(() => {
  //   if (!document.getElementsByClassName('icon-tooltip').length && redRef.current !== null) {
  //     // var newElement = document.createElementNS('http://www.w3.org/2000/svg', 'image'); //Create a path in SVG's namespace
  //     // newElement.setAttribute('href', redLogo); //Set path's data
  //     // newElement.setAttribute('class', 'icon-tooltip')
  //     // newElement.setAttribute('height', 30)
  //     // newElement.setAttribute('width', 30)
  //     // newElement.setAttribute('transform', 'translate(100, 400)')
  //     // newElement.style.pointerEvents = 'all'
  //     redRef.current.addEventListener('mouseover', mouseEventFired)
  //     // // newElement.style.stroke = "#000"; //Set stroke colour
  //     // // newElement.style.strokeWidth = "5px"; //Set stroke width
  //     svgRef.current.children[0].appendChild(redRef.current)
  //     redRef.current.setAttribute('x', 0)
  //     redRef.current.setAttribute('y', 0)
  //   }

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <div className="App">
      {/* <header>
        <Logo ref={svgRef} height={800} width={800} />
        <p>
          Edit and save to reload.
        </p>
      </header>
      <Red ref={redRef} height={20} width={20}/> */}
      <Chart />
    </div>
  );
}

export default App;
