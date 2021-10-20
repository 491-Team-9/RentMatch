import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connectField } from 'uniforms';
import PropTypes from 'prop-types';


function Image({ onChange, value }) {
  return (
    <div className="ImageField" style={{marginBottom: '20px'}}>
      <label htmlFor="file-input">
        <h4>Add rental picture</h4>
        <Icon name="add" size="large"/>
      {value.map((pic) => 
        <img
            alt="Select a photo of your vaccine card"
            key={pic}
            style={{
              cursor: 'pointer',
              width: '150px',
              height: '150px',
              background: '#B0F9FF',
              borderRadius: '3px',
              marginRight: '5px' }}
            src={pic}
          />
      )}
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={({ target: { files } }) => {
          let newFiles = [];
          for (let i = 0; i < files.length; i++) {
            newFiles.push(URL.createObjectURL(files[i]));
          }
          onChange(newFiles);
        }}
        style={{ display: 'none' }}
        type="file"
        multiple
      />
    </div>
  );
}

Image.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
};

export default connectField(Image);
