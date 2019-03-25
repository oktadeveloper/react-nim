import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Callout, Callouts,
  FormTitle, TextInput, PasswordInput, CheckBox, TextArea, FormActions, FormFooter,
  Modal } from '../src';

const CalloutDemo = () => <React.Fragment>
  {["pending", "info", "warning", "error"].map(t =>
    <Callout key={t} kind={t as Callouts} title={`${t[0].toUpperCase()}${t.substr(1)}`}>
      <p>Callout body</p>
    </Callout>
  )}
  <Callout kind={"error" as Callouts}>
    <p>No title</p>
  </Callout>
</React.Fragment>;

class FormDemo extends React.Component {
  private ref1 = React.createRef<HTMLInputElement>();
  private ref2 = React.createRef<HTMLInputElement>();
  private ref3 = React.createRef<HTMLInputElement>();
  private ref4 = React.createRef<HTMLTextAreaElement>();

  public render () {
    return <form className="form">
      <FormTitle>Title</FormTitle>
      <p>
        This is a form!
      </p>
      <TextInput label="Text Input" defaultValue="default value" autoSave="off" autoComplete="off" autoFocus={false} ref={this.ref1} />
      <TextInput label={<h5>a text input React Node as Label</h5>} />
      <PasswordInput label="Password Input" ref={this.ref2} />
      <CheckBox label="Check Box" ref={this.ref3} />
      <TextArea label="Text Area" ref={this.ref4} />
      <FormActions>
        <button className="button is-button-primary" type="button">Button</button>
        <button className="button is-button-secondary" type="button">Other Button</button>
      </FormActions>
      <FormFooter>
        By clicking Button, you implicitly agree to this form footer.
      </FormFooter>
    </form>;
  }
}

Modal.setAppElement('body');


class ModalDemo extends React.Component<{}, { submitted: boolean }> {
  private modalRef = React.createRef<Modal>();
  public constructor (props: {}) {
    super(props);
    this.state = {
      submitted: false,
    }
  }

  private submit (e: any) {
    this.setState({ submitted: true });
    this.modalRef.current.close(e);
  }

  public render () {
    return <>
      <Modal
        ref={this.modalRef}
        title="Example Modal"
        submitBtnTxt="Submit!"
        submit={this.submit.bind(this)}>
        <p>
          Example modal text?
        </p>
      </Modal>
      <button type="button" className="button is-button-primary" onClick={e => this.modalRef.current.open(e)}>Open modal</button>
      { this.state.submitted && <h4>SUBMITTED</h4>}
    </>;
  }
}

const Spacer = () => <div style={{ height: 50 }} />;

const App = () => <div style={{ maxWidth: 1248, margin: 'auto', padding: 20 }}>
  <h1>React Nim Hot Loaded Demo</h1>

  <h2 id="callout">Callout</h2>
  <CalloutDemo />
  <Spacer />

  <h2 id="form">Form</h2>
  <FormDemo />
  <Spacer />

  <h2 id="modal">Modal</h2>
  <ModalDemo />
  <Spacer />
</div>;

ReactDom.render(<App />, document.body);