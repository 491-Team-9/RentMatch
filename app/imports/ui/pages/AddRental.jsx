import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Rentals } from '../../api/rental/Rental';
import ImageField from '../components/ImageComponent';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  description: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  type: {
    type: String,
    allowedValues: ['house', 'room', 'apartment', 'condo', 'in-law', 'cottage', 'loft'],
    defaultValue: 'apartment',
  },
  picture: {
    type: Array,
    uniforms: { component: ImageField },
  },
  'picture.$': String,
});

const bridge = new SimpleSchema2Bridge(formSchema);



/** Renders the Page for adding a document. */
class AddRental extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pics: [],
    };
  }

// sets each uploaded picture to base64 encoded string
async setPictures(key, value) {
  if (key === "picture") {
    let newPics = [];
    for (let i = 0; i < value.length; i++) {
      console.log(value[i]);
      const blob = await fetch(value[i]).then(r => r.blob());
      console.log(blob);
      let reader = new FileReader();
      reader.onloadend = () => {
        newPics.push(reader.result);
        console.log(reader.result);
      }
      reader.readAsDataURL(blob);
    }
    this.setState({pics: newPics})    
  }
}

  // On submit, insert the data.
  async submit(data, formRef) {
    const { title, description, location, price, bedrooms, bathrooms, type, picture } = data;
    //console.log(this.state.pics);
    const owner = Meteor.user();
    //console.log(owner);

    Rentals.collection.insert({ title, description, location, price, bedrooms, bathrooms, type, picture: this.state.pics,
      likes: [], ownerId: owner._id },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Rental Unit added successfully', 'success');
          formRef.reset();
        }
    });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Rental</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onChange={(key, value) => this.setPictures(key, value)} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='title'/>
              <TextField name='location'/>
              <LongTextField size="4" name='description'/>
              <NumField name='price' decimal={false}/>
              <NumField name='bedrooms' decimal={false}/>
              <NumField name='bathrooms' decimal={false}/>
              <SelectField name='type'/>
              <ImageField name='picture'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddRental;
