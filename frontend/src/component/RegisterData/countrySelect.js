import Styled from 'styled-components';
import { countries } from './countriesData';
import { FormControl } from 'react-bootstrap';

const StyledSelect = Styled(FormControl)`
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
    const getCountryLabel = (countryCode) =>{
        const country = countries.find(c=> c.value === countryCode);
        return country ? country.label : '';
    }
    return (
        <StyledSelect value={value} onChange={onChange} as="select" aria-required="true" aria-labelledby="dropdown-label">
            <option value="" disabled>Selecione um país</option>
            {countries.map((country) => (
                <option key={country.value} value={country.value}>
                {getCountryLabel(country.value)}
                </option>
            ))}

        </StyledSelect>
    );
};

export default CountrySelect;