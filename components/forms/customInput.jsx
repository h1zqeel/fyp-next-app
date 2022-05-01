import { TextField } from "@mui/material";

const CustomInput = ({name,  def='', disabled=false}) => {
    return (<div className="mt-4 w-1/4">
                <TextField id="filled-basic" fullWidth={true} size="small" label={name} variant="outlined" defaultValue={def} disabled={disabled}/>
            </div>)
}

export default CustomInput;