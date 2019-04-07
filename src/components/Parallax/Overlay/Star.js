import React from 'react'
import styled from 'styled-components'
import { withFirebase } from '../../Firebase/context'
import { FaStar } from 'react-icons/fa';

function validate(starName, starValue) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (starName.length === 0) {
    errors.push("Please tell me your name");
  }

  if (starValue === 0) {
    errors.push("So sad, You showed me no love");
  }

  return errors;
}

class Star extends React.Component {
  state = {
    loading: false,
    count: "",
    total: 0,
    starName: "",
    starValue: 0,
    errors: [],
    starred: false,
  }

  componentDidMount() {
    this.setState({ loading: true });
    let summed = 0

    this.props.firebase.stars().once('value', snapshot => {
      const object = snapshot.val()

      if(object) {
        // const star = Object.keys(object).map(key => ({
        //   ...object[key],
        //   uid: key,
        // }))
        const length = Object.keys(object).length
        for (var key in object) {
          summed += parseInt(object[key].value)
        }

        this.setState({
          count: length,
          total: summed,
          loading: false,
        });
      } else {
        this.setState({ count: null, total: 0, loading: false });
      }
    })
  }

  componentWillUnmount() {
    this.props.firebase.star().off();
  }

  onChangeName = event => {
    this.setState({ starName: event.target.value });
  };

  onChangeValue = () => {
    this.setState( prevState => ({ starValue: prevState.starValue === 5 ? 5 : prevState.starValue + 1 }));
  };

  onCreateStar = event => {
    let { starName, starValue } = this.state
    const errors = validate(starName, starValue);

    event.preventDefault();

    if (errors.length > 0) {
      this.setState({ errors });
    } else {
      this.props.firebase.star().push({
        uid: this.state.starName,
        value: this.state.starValue,
      });
      this.setState({ starName: '', starValue: 0, errors: [], starred: true })
      this.props.onModal()
    }
  };

  render() {
    const { count, total, starName, starValue, errors, starred } = this.state
    const { modal } = this.props
    // <h1>Stars: { stars[0].value }</h1>

    if (starred) {
      return (
        <React.Fragment>
          {modal && <Stats>
            <Box>
              <span>
                Thank you for your stars!
              </span>
              <span>+{total} stars</span>
            </Box>
          </Stats>}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {modal && <Stats>
            <Box>
              <span style={{ marginBottom: '2rem' }}>Show your support by giving me some stars!</span>
              <span>{starValue}</span>
              <FaStar style={{ cursor: 'pointer', margin: 0, padding: 0 }} color="yellow" size="100%" onClick={this.onChangeValue} />
              <span>+{total} | { count }</span>
              <Form onSubmit={this.onCreateStar}>
                {errors.map(error => (
                  <span key={error}>Error: {error}</span>
                ))}
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={starName}
                  onChange={this.onChangeName}
                />
                <Button type="submit">Send</Button>
              </Form>
            </Box>
          </Stats>}
        </React.Fragment>
      )
    }
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 70%;

  @media (max-width: 700px) {
    width: 100%;
  }
`

const Button = styled.button`
  opacity: 0.88;
  height: 30px;
  border-width: 0;
  background: yellow;
  color: black;
  border-radius: 5px;
  white-space: nowrap;
  box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  padding: 0 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
  }

  &:focus{
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #orange;
    box-shadow: none;
    transition-duration: 10ms;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 70%;
  color: whitesmoke;
`;

const Stats = styled.div`
  position: absolute;
  z-index: 999;
  left: 50px;
  top: 0;
  bottom: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 100%;
  border: 0;

  @media (max-width: 700px) {
    left: 10px;
  }
`;

export default withFirebase(Star);
