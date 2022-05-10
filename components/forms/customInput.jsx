import { TextField } from "@mui/material";

const CustomInput = ({name,  def='', disabled=false, multiline=false, state, setState}) => {
    return (<div className="mt-4 lg:w-1/4">
                <TextField id="filled-basic" multiline={multiline} minRows={4} maxRows={10} fullWidth={true} size="small" label={name} variant="outlined" defaultValue={def} disabled={disabled} value={state} onChange={e => setState(e.target.value)}/>
            </div>)
}

export default CustomInput;