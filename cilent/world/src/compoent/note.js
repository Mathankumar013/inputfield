import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";

const ADD_NOTE = gql`
  mutation($note: String!) {
    noteList(note: $note) {
      id
      note
    }
  }
`;

const GET_NOTE = gql`
  query{
    getNote {
      id
      note
    }
  }
`;

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      data: [],
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { note } = this.state;

      // ADD_NOTE mutation
      await this.props.addNote({
        variables: { note },
      });

      // Refetch the GET_NOTE query to update the notes list
      const { data } = await this.props.getNotes.refetch();

      this.setState({ data: data.getNote, note: "", error: null });
  };


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Input</h1>
          <input
            type="text"
            onChange={(e) => this.setState({ note: e.target.value })}
            value={this.state.note}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default graphql(GET_NOTE, { name: "getNotes" })(
  graphql(ADD_NOTE, { name: "addNote" })(Note)
);
