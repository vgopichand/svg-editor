import { makeStyles } from '@material-ui/core/styles'
import MaterialUITooltip from '@material-ui/core/Tooltip'

const Tooltip = ({ title, placement, children }) => {
  const classes = makeStyles(() => (S))()

  return (
    <MaterialUITooltip
      {...{ placement, title }}
      interactive
      enterDelay={500}
      leaveDelay={50}
      enterTouchDelay={0}
      leaveTouchDelay={50}
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
      arrow
    >
      {children}
    </MaterialUITooltip>
  )
}

export default Tooltip

const S = {
  tooltip: {
    fontSize: '1rem',
    padding: '2px',
    maxWidth: '320px',
    color: '#767676',
    backgroundColor: '#FFFFFF',
    borderTop: '4px solid red;',
    border: '2px solid #939598',
    boxShadow: `
      2px 2px 2px -2px #939598,
      2px 2px 2px -2px #939598,
      -2px 2px 2px -2px #939598
    `
  },
  arrow: {
    fontSize: '25px',
    color: '#939598'
  }
}

// import { createSvgIcon } from "@material-ui/core/utils";

// export default createSvgIcon(
//   <rect
//     width="300"
//     height="100"
//     style={{ fill: "rgb(0,0,255)", strokeWidth: 3, stroke: "rgb(0,0,0)" }}
//   />,
//   "React"
// );
