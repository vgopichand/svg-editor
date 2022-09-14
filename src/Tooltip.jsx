import ReactTooltip from "react-tooltip";
import AlertTooltip from "./AlertTooltip";

const DataTooltip = () => {
  return (
    <ReactTooltip id="alert-id" place="top" effect="solid">
      <AlertTooltip />
    </ReactTooltip>
  )
}

export default DataTooltip
