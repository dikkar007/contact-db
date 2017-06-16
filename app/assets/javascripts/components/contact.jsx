class Contact extends React.Component {
  render () {
    let contact = this.props.contact;
    return (
      <tr key={contact.id}>
        <td>{contact.first_name}</td>
          <td>{contact.last_name}</td>
          <td>{contact.email_address}</td>
          <td>{contact.phone_number}</td>
          <td>{contact.company_name}</td>
          <td><DeleteButton id={contact.id} type="contacts" deleteEntity={this.props.removeContact}/></td>
      </tr>
    )
  }
}