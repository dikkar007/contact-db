class DeleteButton extends React.Component {
  render () {
    return(
      <button onClick={this.props.deleteEntity.bind(this, this.props.id)}>DEL</button>
    )
  }
}