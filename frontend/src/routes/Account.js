import zxcvbn from 'zxcvbn';
import Styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import { Form, FloatingLabel, Alert } from 'react-bootstrap';
import CountrySelect from '../component/RegisterData/countrySelect';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../Context/userContext";
import SucessModal from '../component/Modal/modal';

const Container = Styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    font-size: 17px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
    `
const Title = Styled.h1`
    font-size: 34px;
    margin-top: 10px;
    font-weight: bold;
    line-height: 1.47059;
    letter-spacing: -.022em;
    `
const SubTitle = Styled.h2`
    font-size: 17px;
    margin:5px 0 30px;
    `
const ContainerName = Styled.div`
    width: 100%;
    max-width: 460px;
    display: grid;
    grid-template-rows: 1;
    grid-template-columns: 45% 45%;
    justify-content: space-between;
    padding: 0;
    `
const InputNameLastname = Styled(Form.Control)`
    width: 100%;
    font-size: 1em;
    border: 0.5px solid #h1h1h1;
    background-color: #fff;
    border-radius: 4px;
    `
const Input = Styled(Form.Control)`
    width: 100%;
    font-size: 1;
    border: 0.5px solid #dee2e6;
    background-color: #fff;
    border-radius: 4px;
    `
const LabelFloating = Styled(FloatingLabel)`
    width: 100%;
    background-color: transparent !important;
    color: #7e7b7b;
    && form-label {
        color: #fff;
        background-color: transparent !important;
        }
        && form-label::after{
            background-color: transparent !important;
            }
    `
const ContainerOthers = Styled.div`
    width: 100%;
    padding: 0;
    display: flex;
    max-width: 460px;
    flex-direction: column;
    justify-content: center;
    `
const LabelCountry = Styled.p`
    margin: 10px 0;
    color: #666;
    font-size: 0.9em;
    font-weight: 500;

    `
const Line = Styled.p`
    border: 1px solid #e7e7e8;
    width: 90%;
    margin: 2% 0;
    `
const ContainerAccount = Styled.div`
    width: 100%;
    max-width: 460px;
    `
const PasswordInputContainer = Styled.div`
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    position: relative;
    
    `
const PasswordStrengthMeter = Styled.div`
    height: 10px;
    margin: 2px solid red;
    display: ${({ $isFocused }) => ($isFocused ? 'block' : 'none')};
    background-color: ${({ $score }) => {
        switch ($score) {
            case 0: return '#ff4d4d';
            case 1: return '#ff944d';
            case 2: return '#ffc107';
            case 3: return '#c3e88d';
            case 4: return '#4caf50';
            default: return '#ccc';
        }
    }} !important;
    width: ${({ $score }) => `${($score + 1) * 20}%`};
    transition: width 0.3s ease;
    margin-top: 5px;
    `
const PasswordRequirements = Styled.ul`
    font-size: 0.85rem;
    color: #666;
    padding: 0;
    margin: 0;
    list-style: none;
    display: ${({ $isFocused }) => ($isFocused ? 'block' : 'none')};
    position: absolute;
    top: 100%;  /* Posiciona abaixo do input */
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
    padding: 10px;
    margin-top: 5px;
    background-color: #fff !important;

    li {
        margin-bottom: 5px;
        color: ${({ $isValid }) => ($isValid ? '#4caf50' : '#ff4d4d')};
    }
    `
const PasswordError = Styled.label`
    color: red;
    width: 100%;
    font-size: 12px;
    margin: 5px 0;
    visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
    height: ${({ $show }) => ($show ? 'auto' : '0')};
    `
const ContainerTelephone = Styled.div`
    width: 100%;
    max-width: 460px;
    padding: 10px;
    `
const ButtonSubmit = Styled.button`
    width: auto;
    padding: 5px 20px !important; 
    margin: auto;
    color: #fff;
    background: linear-gradient(#51a9ee, #147bcd);
    border-color: #1482d0;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    min-width: 30px;
    font-weight: 400;
    letter-spacing: 0.1em;
    line-height: 1.47059;
    font-family: SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    white-space: nowrap;
    margin: 50px 0px 100px;
    `
const ContainerLabel = Styled.div`
    width: 100%;
    max-width: 460px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    & >p{
        margin: 0 0 0 10px;
        }
    `
const CheckBox = Styled.input`
    width: auto;
    height: 100%;
    margin: 0;
    padding: 0;
    `
function CreateAccount() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [score, setScore] = useState(0);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { logout } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        country: '',
        birthdate: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        agreed: false,
    });

    const fullname = `${formData.name} ${formData.lastname}`;

    //#####FormatarTelefone#####

    const handleTelelphoneChange = (event) => {
        let input = event.target.value.replace(/\D/g, '');

        if (input.length > 11) input = input.slice(0, 11);

        if (input.length >= 11) {
            input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
        } else if (input.length >= 2) {
            input = `(${input.slice(0, 2)})${input.slice(2)}`;
        }
        setFormData(prevState => ({ ...prevState, phone: input }));
    };

    //

    //#####FormatarData#####

    const handleCountryChange = (event) => {
        const selectedValue = event.target.value;
        setFormData(prevState => ({ ...prevState, country: selectedValue }));
    };

    const handleBirthDateChange = (event) => {
        let input = event.target.value.replace(/\D/g, '');

        if (input.length > 8) input = input.slice(0, 8);

        if (input.length >= 5) {
            input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
        } else if (input.length >= 3) {
            input = `${input.slice(0, 2)}/${input.slice(2)}`;
        }
        setFormData(prevState => ({ ...prevState, birthdate: input }));
    };

    const handleBirthDateBlur = () => {
        if (formData.birthdate.length !== 10) {
            alert('Por favor, insira uma data válida no formato DD/MM/AAAA.');
            setFormData(prevState => ({ ...prevState, birthdate: '' }));
        }
    };

    const formatBirthdate = (date) => {
        if (!date || date.length !== 8) return date;
        return `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4, 8)}`;
    };

    //

    //#####Validação de Senha#####

    const passwordRequirements = [
        { label: 'No mínimo 8 caracteres', test: (pwd) => pwd.length >= 8 },
        { label: 'Pelo menos uma letra maiúscula', test: (pwd) => /[A-Z]/.test(pwd) },
        { label: 'Pelo menos uma letra minúscula', test: (pwd) => /[a-z]/.test(pwd) },
        { label: 'Pelo menos um número', test: (pwd) => /\d/.test(pwd) },
        { label: 'Pelo menos um caractere especial (!@#$%^&*)', test: (pwd) => /[!@#$%^&*]/.test(pwd) },
    ];

    const handlePasswordChange = (event) => {
        const pwd = event.target.value;
        setPassword(pwd);
        setFormData(prevState => ({ ...prevState, password: pwd }));
        const result = zxcvbn(pwd);
        setScore(result.score);
    };
    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
        setShowPasswordError(password && confirmPassword && password !== confirmPassword);
    };

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
        setFormData(prevState => ({ ...prevState, confirmPassword: event.target.value }))
    };

    //

    //#####LimparFormulario#####

    const resetForm = () => {
        setFormData({
            name: '',
            lastname: '',
            country: '',
            birthdate: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            agreed: false,
        });
        setPassword('');
        setConfirmPassword('');
        setScore(0);
        setIsPasswordFocused(false);
        setShowPasswordError(false);
    };

    const resetFormChange = () => {
        setFormData({
            password: '',
            confirmPassword: '',
        });
        setPassword('');
        setConfirmPassword('');
        setIsPasswordFocused(false);
        setShowPasswordError(false);
    }

    //

    //#####verifica se o usuario esta logado#####

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (user) {
            const [firstName, ...lastNameParts] = user.nomeUsuario.split(' ');
            const lastName = lastNameParts.join(' ');
            setFormData({
                name: firstName,
                lastname: lastName || '',
                country: user.paisUsuario || '',
                birthdate: formatBirthdate(user.dataNascimento || ''),
                email: user.emailUsuario || '',
                phone: user.telefoneUsuario || '',
                agreed: true,
            });

            if (user.id) {
                setIsEditing(true);
            }
        }
    }, []);

    //

    //#####TratarModal#####
    const handleModalConfirm = () => {
        // Fechar o modal e redirecionar para o login
        setShowModal(false);
        navigate('/login');
    };
    // 

    //#####Enviar Requisição de Post E Put#####

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!isEditing && !emailRegex.test(formData.email)) {
            setErrorMessage("Por favor, insira um e-mail válido no formato nome@dominio.com");
            setSuccessMessage('');
            return;
        }

        const requiredFields = [
            formData.name,
            formData.lastname,
            formData.country,
            formData.birthdate,
            formData.email,
            formData.password,
            formData.confirmPassword,
            formData.phone,
        ];

        if (requiredFields.some(field => !field.trim())) {
            setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
            setSuccessMessage('');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("As senhas não correspondem.");
            setSuccessMessage('');
            return;
        }

        const prepareFormDataForSubmission = () => {
            const formattedData = {
                ...formData,
                name: fullname,
                birthdate: formData.birthdate.replace(/\//g, ''),
            };
            return formattedData;
        };

        const prepareDataFormToChange = () => {
            const formattedData = {
                ...formData,
                nomeUsuario: fullname,
                dataNascimento: formData.birthdate.replace(/\//g, ''),
                telefoneUsuario: formData.phone,
                paisUsuario: formData.country,
                senhaUsuario: formData.password
            };
            return formattedData;
        };

        const dataToSubmit = prepareFormDataForSubmission();
        delete dataToSubmit.lastname;

        const dataToChange = prepareDataFormToChange();

        if (!isEditing) {//Post
            try {
                const response = await userService.criarUsuario(dataToSubmit);
                console.log('Conta Criada com sucesso', response);
                setSuccessMessage("Conta criada com sucesso!");
                setErrorMessage('');
                resetForm();
                navigate('/login');
            } catch (error) {
                console.log('Erro ao criar a conta.', error);
                setErrorMessage("Erro ao criar a conta! Verifique os dados e tente novamente.");
                setSuccessMessage('');
            }
        } else {//Put
            try {
                const user = JSON.parse(sessionStorage.getItem('user'));
                if (user && user.id) {
                    const updateData = { ...dataToChange, id: user.id };
                    const response = await userService.atualizarUsuario(updateData);
                    console.log('Conta Alterada com sucesso', response);
                    resetFormChange();
                    setSuccessMessage("Informações atualizadas com sucesso!");
                    setErrorMessage('');
                    logout();
                    setShowModal(true);
                } else {
                    setErrorMessage("Usuario não encontrado.")
                    setSuccessMessage('');
                }
            } catch (error) {
                setErrorMessage("Erro ao atualizar as informações. Tente novamente.");
                setSuccessMessage('');
            }
        }
    };

    return (
        <Container>
            <Title>Crie sua Conta Apple</Title>
            <SubTitle>Uma Conta Apple é o que você precisa para acessar todos os serviços da Apple.</SubTitle>
            <ContainerName>
                <LabelFloating controlId="Name" label="Nome">
                    <InputNameLastname
                        type='text'
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder='' />
                </LabelFloating>
                <LabelFloating controlId="Lastname" label="Sobrenome">
                    <InputNameLastname
                        type='text'
                        value={formData.lastname || ''}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        placeholder='' />
                </LabelFloating>
            </ContainerName>
            <ContainerOthers>
                <LabelCountry>PAÍS/REGIÃO</LabelCountry>
                <LabelFloating controlId="countrySelect" label="">
                    <CountrySelect
                        value={formData.country || ''}
                        onChange={handleCountryChange}
                    />
                </LabelFloating>
                <LabelFloating controlId="dataNascimento" label="Data de Nascimento">
                    <Input type='text'
                        value={formData.birthdate || ''}
                        onChange={handleBirthDateChange}
                        onBlur={handleBirthDateBlur}
                        placeholder="DD/MM/AAAA"
                        maxLength="10" />
                </LabelFloating>
            </ContainerOthers>
            <Line></Line>
            <ContainerAccount>
                <LabelFloating controlId="email" label="E-mail">
                    <Input type='email'
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nome@example.com"
                        disabled={isEditing} />
                </LabelFloating>
                <PasswordInputContainer>
                    <LabelFloating controlId="password" label="Senha">
                        <Input
                            type='password'
                            value={password}
                            onChange={handlePasswordChange}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            placeholder=""
                            required />
                    </LabelFloating>
                    <PasswordStrengthMeter $score={score} $isFocused={isPasswordFocused} />
                    <PasswordRequirements $isFocused={isPasswordFocused}>
                        {passwordRequirements.map((req, index) => (<li key={index} style={{ color: req.test(password) ? '#4caf50' : '#ff4d4d' }}>{req.label}</li>
                        ))}
                    </PasswordRequirements>
                </PasswordInputContainer>
                <LabelFloating controlId="confirmPassword" label="Confirmar senha">
                    <Input
                        type='password'
                        value={confirmPassword || ''}
                        onChange={handleConfirmPassword}
                        onBlur={handlePasswordBlur}
                        placeholder="" />
                </LabelFloating>

                <PasswordError $show={showPasswordError}>As senhas não correspondem.</PasswordError>

            </ContainerAccount>
            <Line></Line>
            <ContainerTelephone>
                <LabelFloating controlId="telephone" label="Número de telefone">
                    <Input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={handleTelelphoneChange}
                        pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
                        placeholder="(99) 99999-9999"
                        required />
                </LabelFloating>
                <ContainerLabel>
                    <CheckBox
                        type='checkbox'
                        checked={formData.agreed || ''}
                        onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                        placeholder="" /><p>Eu li e concordo com os termos de uso.</p>
                </ContainerLabel>
            </ContainerTelephone>

            <ButtonSubmit type='button' onClick={handleSubmit}>Criar Conta</ButtonSubmit>
            {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && (
                <Alert variant="danger">{errorMessage}</Alert>
            )}
            <SucessModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={handleModalConfirm}
            />
        </Container>
    )
}

export default CreateAccount;