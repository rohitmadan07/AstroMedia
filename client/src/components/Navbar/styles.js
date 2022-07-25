import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    backgroundColor:'#cffa04',
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
    color:'#0b00ff',
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
    borderRadius: 35,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
    //backgroundColor:'#0b00ff',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
    backgroundColor:'#ff0000',
  },
  signin: {
    marginLeft: '20px',
    backgroundColor:'#0b00ff',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#3413d2',
    fontWeight: 'bold',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: '#3e07a1',
    width: '48px',
    height: '47px',
  },
}));