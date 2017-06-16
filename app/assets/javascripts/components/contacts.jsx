class Contacts extends React.Component {
    constructor() {
        super();
        this.state = {
            contacts: [],
            hiddenContacts: [],
            value: '',
            value_remove :''
        }
    }

    componentDidMount() {
        this.pullContacts();
    }

    pullContacts() {
        $.get('api/v1/contacts', (data) => {
            this.setState({contacts: data});
        }.bind(this)
    );
    }

    uploadFile() {
        this.setState({value: 'true'});
        let formData = new FormData();
        let file = $('#uploadContactsFile')[0].files[0];
        if (file === undefined) {
            return;
        }
        formData.append('csv_upload', file);
        $.ajax({
            url: 'api/v1/contacts',
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: (data) => {
                this.setState({contacts: data});
                this.setState({value: ''});
            }
        })
    }


    removeContact(contactId) {
        $.ajax({
            url: `api/v1/contacts/${contactId}`,
            type: 'DELETE',
            success: () => {
                this.setState({
                    contacts: _.reject(this.state.contacts, {
                        id: contactId
                    })
                })
            }
        })
    }

    removeAllContact() {
        this.setState({value_remove: 'true'});
        $.ajax({
            url: `api/v1/contacts/-1`,
            type: 'DELETE',
            success: (data) => {
                this.setState({contacts: data});
                this.setState({value_remove: ''});
            }
        })
    }

    contactsList() {
        return this.state.contacts.map((contact, index) => {
            if (this.state.hiddenContacts.indexOf(contact.id) > -1) {
                return;
            }
            return <Contact key={contact.id} contact={contact} removeContact={this.removeContact.bind(this)}/>;
        }.bind(this)
    );
    }

    headerList() {
        return ['First Name', 'Last Name', 'Email', 'Phone Number', 'Company Name', 'Delete'].map((header, index) => {
            return <td key={index}>{header}</td>;
        });
    }

    filterDotCom(event) {
        if (event.target.value == 'com') {
            const re = /@\w*.com/;
            let hiddenContacts = _.reject(this.state.contacts, (contact) => {
                return re.test(contact.email_address)
            });
            this.setState({hiddenContacts: hiddenContacts.map((contact) => contact.id)})
        }
        else
            this.setState({hiddenContacts: []})
        this.toggleSortAbc();
        return this.state.contacts;
    }

    toggleSortAbc(event) {
        if (event.target.value == 'asc')
            this.contactsSortAsc();
        if (event.target.value == 'dsc')
            this.contactsSortDsc();
        if (event.target.value == 'def')
            this.contactsSortDef();
    }

    contactsSortAsc(contacts) {
        contacts = contacts || this.state.contacts;
        this.setState({contacts: this.sortAsc(contacts, 'email_address')});
        return this.state.contacts;
    }

    contactsSortDsc(contacts) {
        contacts = contacts || this.state.contacts;
        this.setState({contacts: this.sortDsc(contacts, 'email_address')});
        return this.state.contacts;
    }


    render() {
        return (

            <div >
                <hr/>
                <div className="title"> Contactually Lite</div>
                <hr/>
                <div >
                    <table>
                        <tr>
                            <td className='spacing'>
                                Filter Email Addresses
                                <div onChange={this.filterDotCom.bind(this)}>
                                    <input type="radio" value="com" name="filter"/> .com
                                    <input type="radio" value="def" name="filter"/> Default
                                </div>

                            </td>

                            <td className='spacing'>
                                Sort by Email Address
                                <div onChange={this.toggleSortAbc.bind(this)}>
                                    <input type="radio" value="asc" name="sort"/> Asc
                                    <input type="radio" value="dsc" name="sort"/> Dsc
                                    <input type="radio" value="def" name="sort"/> Default
                                </div>
                            </td>

                            <td className='spacing'>

                                <button disabled={this.state.value_remove} onClick={this.removeAllContact.bind(this)}>Delete All</button>

                            </td>
                        </tr>
                    </table>
                </div>
                <hr/>
                <table>
                    <tr> {this.headerList()} </tr>
                    {this.contactsList()}
                </table>
                <hr/>
                <div>Please upload data.csv file.</div>
                <hr/>
                <div >
                    <input id="uploadContactsFile" type="file"/>
                    <button disabled={this.state.value} onClick={this.uploadFile.bind(this)}>Submit</button>
                </div>
                <hr/>
            </div>
        );
    }

    contactsSortDef(contacts) {
        contacts = contacts || this.state.contacts;
        this.setState({contacts: this.sortAsc(contacts, 'id')});
        return this.state.contacts;
    }

    sortAsc(contactArray, attribute) {
        return contactArray.sort((a, b) => {
            if (a[attribute] > b[attribute]) return 1;
            if (a[attribute] < b[attribute]) return -1;
            return 0
        });
    }

    sortDsc(contactArray, attribute) {
        return contactArray.sort((b, a) => {
            if (a[attribute] > b[attribute]) return 1;
            if (a[attribute] < b[attribute]) return -1;
            return 0
        });
    }

}
