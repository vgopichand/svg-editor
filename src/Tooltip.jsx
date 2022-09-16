import ReactTooltip from "react-tooltip";
import AlertTooltip from "./AlertTooltip";

const DataTooltip = ({ alert }) => {
  const id = alert.id + '_' + alert.status;
  return (
    <ReactTooltip id={id} place="top" effect="solid">
      <AlertTooltip alert={alert} />
    </ReactTooltip>
  )
}

export default DataTooltip
