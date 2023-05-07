import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form , FormGroup , Input , Label, Button, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Forms = () => {
    let [playerList,setPlayerList] = useState([ ]);
    let [agree,setAgree] = useState(false);
    let [player,setPlayer] = useState({
        name: '',
        email: '',
        password: '',
        service: false
        

    });

   const [formErrors,setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    service: '',
   })




    const formSchema = Yup.object().shape({
        name: Yup.string()
            .max(15, 'Username must be atmost 15 characters long!'),
            
        email: Yup.string()
            .required('You must enter a valid email adress!'),
        password: Yup.string()
            .min(8, 'Password must be atleast 8 characters long!'),
        service: Yup.boolean()
            .oneOf([true],'You must accept the terms of service!')






    })

    const checkboxHandler = () => {
        setAgree(!agree);
    }






    const nav = useNavigate();


    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setPlayer({...player, [name] : value});
        Yup.reach(formSchema, name)
            .validate(value)
            .then((valid) => {
                setFormErrors({...formErrors, [name]: ''});                
            })
            .catch((err) => {
                setFormErrors({...formErrors, [name]: err.errors[0]});
            })
    }

    useEffect(() => {
        formSchema.isValid(player).then((valid) => {
            if (valid) console.warn('Ok!');
            else console.warn('Hatalı Form!');
        } )
        
    })


    useEffect(() => {
        console.warn(formErrors);
    }, [formErrors]);

    let [name,setName] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [holdData,setHoldData] = useState([]);
    let [response,setResponse] = useState();

    

    return(

        <div>
        <Form onSubmit={(event) => {
            event.preventDefault();
            setPlayerList([...playerList, player]);
            //playerList.push(player);
            console.log(playerList);

            axios
                .post('https://reqres.in/api/users',{...player})
                .then((res) => {
                    console.log('Yeni kullanıcı:', res.data);
                    setResponse(res.data);

                })
                
                setHoldData([...holdData,player])
                                            
            }}>


            

            <FormGroup>
            <Label htmlFor="user-name">Name: </Label>
            <Input id="user-name" name='name' type="text" onChange={inputChangeHandler} invalid={!!formErrors.name} />
            {formErrors.name && <FormFeedback>{formErrors.name}</FormFeedback>}
            </FormGroup>

            <FormGroup>
            <Label htmlFor="user-mail">Email: </Label>
            <Input id="user-mail" name='email' type="email" onChange = {inputChangeHandler} invalid={!!formErrors.email} />
            {formErrors.email && <FormFeedback>{formErrors.email}</FormFeedback>}
            </FormGroup>

            <FormGroup>
            <Label htmlFor="user-password">Password: </Label>
            <Input id='user-password' name='password' type="password" onChange = {inputChangeHandler} invalid={!!formErrors.password} />
            {formErrors.password && <FormFeedback>{formErrors.password}</FormFeedback>}
            </FormGroup>

            <FormGroup>
            <Label htmlFor="user-service">I have read, and accept the terms of service. </Label>
            <Input id='user-service' name='service' type="checkbox" onChange={((event) => {setPlayer({...player, service: !event.target.boolean})})} invalid={!!formErrors.service}/>
            {formErrors.service==false && <FormFeedback>You have to accept the Terms and Conditions.</FormFeedback>}
            </FormGroup>
            
            <Button type="submit">Submit</Button>

            
            
            
        </Form>

        
        
        
        
        </div>
    )


}


export default Forms;
