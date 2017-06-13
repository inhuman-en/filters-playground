import React from 'react';

class UploadForm extends React.Component {

    onFormSubmit (e) {
        e.preventDefault();
        this.props.onFormSubmit(new FormData(e.target))
    }

    render() {
        return (
            <form class="form-fileupload" onSubmit={this.onFormSubmit.bind(this)}>
                <div>
                    <input type="file" name="img" accept="image/*"/>
                </div>
                <input type="submit" value="Upload" />
            </form>
        );
    }
}

export default UploadForm;