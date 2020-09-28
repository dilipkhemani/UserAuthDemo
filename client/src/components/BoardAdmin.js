import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <BootstrapTable
      data={content}
      options={{ noDataText: "Loading External Users..." }}
      striped
      hover
      condensed
    >
      <TableHeaderColumn isKey hidden dataField="_id">
        id
      </TableHeaderColumn>
      <TableHeaderColumn dataField="firstname">First Name</TableHeaderColumn>
      <TableHeaderColumn dataField="lastname">Last Name</TableHeaderColumn>
      <TableHeaderColumn dataField="telephone">Telephone</TableHeaderColumn>
      <TableHeaderColumn dataField="fulladdress">
        Full Address
      </TableHeaderColumn>
      <TableHeaderColumn dataField="ssn">SSN</TableHeaderColumn>
    </BootstrapTable>
  );
};

export default BoardAdmin;
