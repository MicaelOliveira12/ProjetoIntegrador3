import Styled from 'styled-components';
import { countries } from './countriesData';

const StyledSelect = Styled.select`
    width: 100%;
    margin: 0;
    padding: 10px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: #fff;
    height: 60px;
    margin-bottom: 15px;
    font-size: 17px;
`

const CountrySelect = ({value, onChange}) => {
    return (
        <StyledSelect value={value} onChange={onChange} aria-required="true" aria-labelledby="dropdown-label">
            <option value="" disabled>Selecione um país</option>
            {countries.map((country) => (
                <option key={country.value} value={country.value}>
                {country.label}
                </option>
            ))}

        </StyledSelect>
    );
};

export default CountrySelect;