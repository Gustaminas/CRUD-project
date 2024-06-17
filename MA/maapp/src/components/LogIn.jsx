import { Typography, Grid, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function LogIn() {
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [newUsername, setNewUsername] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [data, setData] = useState(null);
  let [dataAll, setDataAll] = useState([]);
  let [loggedIn, setLoggedIn] = useState(false);
  let [adminLogged, setAdminLogged] = useState(false);
  let [search, setSearch] = useState("");

  let [x1, setX1] = useState("");
  let [x2, setX2] = useState("");
  let [x3, setX3] = useState("");
  let [x4, setX4] = useState("");
  let [x5, setX5] = useState("");
  let [x6, setX6] = useState("");
  let [x7, setX7] = useState("");
  let [x8, setX8] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
   
    let fetchRes2 = await fetch('http://localhost:8080/employees/single', {method:'GET', 
    headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}});
    let data1 = await fetchRes2.json();
    console.log(await data1);
    
    if (fetchRes2.status === 200 && data1.roles === "ROLE_USER") {
      setData(data1);
      setLoggedIn(true);
    }else if(fetchRes2.status === 200 && data1.roles.includes("ROLE_ADMIN")){
      setData(data1);
      setAdminLogged(true);

      let fetchAll = await fetch('http://localhost:8080/employees/all', {method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}});
      let dataAll1 = await fetchAll.json();
      console.log(await dataAll1);
      setDataAll(dataAll1);
    }
  } //onSubmit END
  async function onUpdate(e){
      let fetchUpdate = await fetch('http://localhost:8080/employees/update', {method:'PUT',
        headers: {'Authorization': 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json'},
        body: JSON.stringify({'username' : newUsername, 'password' : newPassword})
      });
      setUsername(newUsername);
      setPassword(newPassword);
      setNewUsername('');
      setNewPassword('');
      
  }//onUpdate END
  
  async function onDelete(id){
    let fetchDelete = await fetch(`http://localhost:8080/employees/${id}`, {method: "DELETE",
      headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}
    })
    setDataAll(dataAll.filter(a => a.id != id));
  }//onDelete END
  async function addNewUser(){
    let fetchAdd = await fetch("http://localhost:8080/employees/add", {method: "POST",
      headers: {'Authorization': 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json'},
      body: JSON.stringify({"firstName" : x1,
                            "lastName" : x2,
                            "email" : x3,
                            "position" : x4,
                            "payroll" : x5,
                            "username" : x6,
                            "password" : x7,
                            "roles" : x8})
    })
    let fetchAll = await fetch('http://localhost:8080/employees/all', {method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa(username + ':' + password)}});
    let dataAll1 = await fetchAll.json();
    setDataAll(dataAll1);
    setX1(''); setX2(''); setX3(''); setX4('');
    setX5(''); setX6(''); setX7(''); setX8('');
  }//addNewUser END
  return loggedIn ? (
    <div>
      <header className="App-header">
        <Grid container spacing={2}>
          <Grid item xs={4}/>
          <Grid item xs={4}>
            <Box>
              <Paper> 
                <Typography variant="h4">{data.firstName} {data.lastName}</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={4}/>
          <Grid item xs={3}/>
          <Grid item xs={2}>
            <Box>
              <Paper> 
                <Typography variant="body1" align="left"> Email: {data.email} </Typography>
                <Typography variant="body1" align="left"> Position: {data.position} </Typography>
                <Typography variant="body1" align="left"> Payroll: {data.payroll}€ </Typography>
                <Typography variant="body1" align="left"> Username: {username} </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={2}/>
          <Grid item xs={3}>
            <Box>
              <Paper>
                <div style={{ display: 'flex',alignItems: 'center', justifyContent: 'center',}}>
                  <Typography variant="body1" > For changing data: </Typography>
                  <TextField id="outlined-basic" label="New username" variant="outlined" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                  <TextField id="outlined-basic" label="New password" variant="outlined" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                  <Button variant="outlined" onClick={(e) => onUpdate(e)}> Update </Button>
                </div>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </header>
    </div>
  ) : (adminLogged ? (
    <div> 
      <header className="App-header">
        <div class="container">
          <div class="Vardas">
            <Typography variant="h4">{data.firstName} {data.lastName}</Typography>  
          </div>
          <div class="Data">
            <Paper> 
              <Typography variant="body1" align="left"> Email: {data.email} </Typography>
              <Typography variant="body1" align="left"> Position: {data.position} </Typography>
              <Typography variant="body1" align="left"> Payroll: {data.payroll}€ </Typography>
              <Typography variant="body1" align="left"> Username: {username} </Typography>
            </Paper>
          </div>
          <div class="Update">
            <Paper>
              <Typography variant="body1" > For changing data: </Typography>
              <TextField id="outlined-basic" label="New username" variant="outlined" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
              <TextField id="outlined-basic" label="New password" variant="outlined" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
              <Button variant="outlined" onClick={(e) => onUpdate(e)}> Update </Button>
            </Paper>
          </div>
          <div class="Lentelė">
          
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableBody>
                        <StyledTableRow> 
                          <StyledTableCell align="left">
                            <TextField id="standard-basic" label="Forename" variant="standard" value={x1} onChange={(e) => setX1(e.target.value)}/>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row" align="left">
                            <TextField id="standard-basic" label="Surname" variant="standard" value={x2} onChange={(e) => setX2(e.target.value)}/>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <TextField id="standard-basic" label="Email" variant="standard" value={x3} onChange={(e) => setX3(e.target.value)}/>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <TextField id="standard-basic" label="Position" variant="standard" value={x4} onChange={(e) => setX4(e.target.value)}/>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <TextField id="standard-basic" label="Payroll" variant="standard" value={x5} onChange={(e) => setX5(e.target.value)}/>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <TextField id="standard-basic" label="Username" variant="standard" value={x6} onChange={(e) => setX6(e.target.value)}/>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <TextField id="standard-basic" label="Password" variant="standard" value={x7} onChange={(e) => setX7(e.target.value)}/>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <TextField id="standard-basic" label="Roles" variant="standard" value={x8} onChange={(e) => setX8(e.target.value)}/>
                          </StyledTableCell>
                          <Button variant="contained" color="primary" size="small" onClick={() => addNewUser()}>Add new</Button>
                        </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body1" >¯\_( ͡° ͜ʖ ͡°)_/¯</Typography>
            <Paper> 
              <TextField id="standard-basic" label="Search" variant="standard" onChange={e=>{setSearch(e.target.value)}}/>
            </Paper>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">ID</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Position</StyledTableCell>
                    <StyledTableCell align="left">Payroll</StyledTableCell>
                    <StyledTableCell align="left">Username</StyledTableCell>
                    <StyledTableCell align="left">Roles</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataAll.filter(item => {
                    if (search == ""){
                      return item
                  }else if ((item.firstName.toLowerCase()+" "+item.lastName.toLowerCase()).includes(search.toLocaleLowerCase())){
                      return item
                  }
                  }).map((item) => {
                      return (
                        <StyledTableRow>
                          <StyledTableCell align="left">{item.id}</StyledTableCell>
                          <StyledTableCell component="th" scope="row" align="left">{item.firstName} {item.lastName}</StyledTableCell>
                          <StyledTableCell align="left">{item.email}</StyledTableCell>
                          <StyledTableCell align="left">{item.position}</StyledTableCell>
                          <StyledTableCell align="left">{item.payroll}€</StyledTableCell>
                          <StyledTableCell align="left">{item.username}</StyledTableCell>
                          <StyledTableCell align="left">{item.roles}</StyledTableCell>
                          <Button variant="contained" color="error" size="small" onClick={() => onDelete(item.id)}>DELETE</Button>
                        </StyledTableRow>
                      );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </header>
    </div>
  ) : (
      <div className="ui placeholder segment">
        <header className="App-header">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <form className="ui form" onSubmit={(e) => onSubmit(e)}>
                <div className="field">
                  <label>Username</label>
                  <div className="ui left icon input">
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      name="username"
                    />
                    <i className="user icon"></i>
                  </div>
                </div>
                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="lock icon"></i>
                  </div>
                </div>
                <button className="ui blue submit button">Login</button>
              </form>
            </div>
          </div>
        </header>
      </div>
    )
  );
}
 