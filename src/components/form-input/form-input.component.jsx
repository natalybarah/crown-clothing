import {Group, FormInputStyles, FormInputLabel} from '../form-input/form-input.styles';

const FormInput=({label, ...otherProps})=>{
    return(
        <Group>
            <FormInputStyles {...otherProps} />
            { label && (
                <FormInputLabel 
                    $shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )} 
        </Group>
    );
    
};

export default FormInput;
