import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Loading } from "../../Components/appCommon";
import DatapageLayout from "../PageLayoutEmpty";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Overlay } from "react-bootstrap";

export default class Edit extends React.Component {
  state = {
    content: null,
    headers: [],
    loading: true,
    settings: {},
    volunteer: [],
    selectedVolunteer: [],
    error: "",
  };

  settings = {
    title: "Project",
    primaryColor: "#a6192e",
    accentColor: "#94795d",
    textColor: "#ffffff",
    textColorInvert: "#606060",
    api: "/api/Project/",
  };
  volunteersettings = {
    title: "Volunteers",
    primaryColor: "#a6192e",
    accentColor: "#94795d",
    textColor: "#ffffff",
    textColorInvert: "#606060",
    api: "/api/Volunteer/",
  };

  has = {
    Create: true,
    Generate: false,
    Delete: false,
  };

  async componentDidMount() {
    await this.getContent().then((content) => {
      // console.log(content);
      this.setState({
        content: content,
      });
    });
    await this.getVolunteerData().then((volunteer) => {
      console.log("Edit -> componentDidMount -> volunteer", volunteer);
      const list = volunteer?.data?.filter(
        (item) => item?.ApprovalStatus === "Approved"
      );
      this.setState({
        volunteer: list,
      });
    });
    await this.getSettings().then((settings) => {
      // console.log(settings);
      this.setState({
        settings: settings,
      });
    });

    this.setState({
      loading: false,
    });
  }

  getSettings = async () => {
    // fetches http://...:5001/api/User/Settings
    return fetch(this.settings.api + "Settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // console.log(res);
      return res.json();
    });
  };

  getContent = async () => {
    return fetch(this.settings.api + "All", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };
  getVolunteerData = async () => {
    return fetch(this.volunteersettings.api + "All", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };
  update = async (data) => {
    // console.log("===;[;[;[", data);
    return fetch(`${this.settings.api}UpdateAndFetch/${data.ProjectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      return res.json();
    });
  };

  //   delete = async (data) => {
  //     await fetch(`https://localhost:5001/api/Project/Delete/${data}`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //     }).then(async (res) => {
  //       location.href = `/Project`;
  //     });
  //   };
  delete = (data) => {
    window.location.href = `/Project/${data}`;
  };

  setVolunteerList = (vol, add) => {
    if (add) {
      this.setState({
        selectedVolunteer: [...this.state.selectedVolunteer, vol],
      });
    } else {
      this.setState({
        selectedVolunteer: this.state.selectedVolunteer.filter(
          (item) => item.UserId !== vol.UserId
        ),
      });
    }
  };

  //SET OR ADD VOLUNTEER

  setVolunteer = (vol) => {
    const id = window.location.href.split("/")[5];
    const Project = this.state.content.data.filter((item) => {
      return item.ProjectId === id;
    });

    const projectVolunteers = JSON.parse(Project[0]?.ProjectType || "[]");

    const data = {
      ...Project[0],
      ProjectId: Project[0]?.ProjectId,
      ProjectType: JSON.stringify([
        ...projectVolunteers,
        ...this.state.selectedVolunteer,
      ]),
    };
    this.handleUpdate(data);
  };

  //DELETE VOLUNTEER
  deleteVolunteer = (vol) => {
    const id = window.location.href.split("/")[5];
    const Project = this.state.content.data.filter((item) => {
      return item.ProjectId === id;
    });

    const filteredVolunteers = JSON.parse(
      Project[0]?.ProjectType || "[]"
    ).filter((item) => item?.UserId !== vol?.UserId);
    const data = {
      ...Project[0],
      ProjectId: Project[0]?.ProjectId,
      ProjectType: JSON.stringify(filteredVolunteers),
    };
    this.handleUpdate(data);
  };
  handleUpdate = async (data) => {
    await this.update(data).then((content) => {
      if (content.success) {
        this.setState({
          error: "",
        });
        window.location.reload(true);
        console.log(data)
        return true;
      } else {
        this.setState({
          error: content.message,
        });
        return false;
      }
    });
  };

  handleDelete = async (data) => {
    await this.delete(data).then((content) => {
      if (content.success) {
        this.setState({
          error: "",
        });
        return true;
      } else {
        this.setState({
          error: content.message,
        });
        return false;
      }
    });
  };

  requestRefresh = async () => {
    this.setState({
      loading: true,
    });
    await this.getContent().then((content) => {
      // console.log(content);
      this.setState({
        content: content,
        loading: false,
      });
    });
  };

  requestError = async (error) => {
    this.setState({
      error: error,
    });
  };

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    } else {
      // console.log(this.state.content.data);

      const id = window.location.href.split("/")[5];
      const data = this.state.content.data.filter((item) => {
        return item.ProjectId == id;
      });
      return (
        <DatapageLayout
          settings={this.settings}
          fieldSettings={this.state.settings.data.FieldSettings}
          headers={this.state.settings.data.ColumnSettings}
          data={data}
          updateHandle={this.handleUpdate}
          requestRefresh={this.requestRefresh}
          error={this.state.error}
          permissions={this.props.permissions}
          requestError={this.requestError}
          has={this.has}
        >
          <ProjectTable data={data[0]} delete={this.delete} />
          <div>
            <VolunteerTable
              deleteVolunteer={this.deleteVolunteer}
              data={data[0]}
            />
            <h1 style={{ marginTop: "100px", marginBottom: "20px" }}>
              Add Volunteers to this Project
            </h1>
            <TableButton
              volunteerData={this.state.volunteer}
              setVolunteerList={this.setVolunteerList}
              deleteVolunteer={this.deleteVolunteer}
              data={data[0]}
              volunteerList={this.state.selectedVolunteer}
            />
          </div>
          <Button onClick={() => this.setVolunteer()}>Submit</Button>
        </DatapageLayout>
      );
    }
  }
}

const ProjectTable = (props) => {
  const data = props.data;
  // console.log(data);
  const deleteFn = props.delete;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Project Name</th>
          <th colSpan={2}>Project Description</th>
          <th>Project Budget</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Project Status</th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>{data.ProjectName}</td>
          <td colSpan={2}>{data.ProjectDescription || "N/A"}</td>
          <td>{data.ProjectBudget}</td>
          <td>{data.ProjectStartDate}</td>
          <td>{data.ProjectEndDate}</td>
          <td>{data.ProjectStatus}</td>
          <td>
            <button
              onClick={() => {
                deleteFn(data.ProjectId);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
function TableButton(props) {
  // Please Note replace projectType variable to new varibal that
  //for the volunteer List and it should be String
  const [showTable, setShowTable] = useState(false);

  function handleClick() {
    setShowTable(!showTable);
  }
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Button onClick={handleClick} variant="primary">
        Show Available Volunteers
      </Button>{" "}
      {!showTable && (
        <Table striped bordered hover style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {props?.volunteerData.map((item) => {
            console.log(
              "check=>",
              props?.data.ProjectType?.includes(item?.UserId)
            );
            return (
              <>
              {props?.data.ProjectType?.includes(item?.UserId) ? null : ( 
             <tbody>
               <tr>
                 <td>{item?.UserId || "N/A"}</td>
                 <td>{item?.username || "N/A"}</td>
                 <td>{item?.Email || "N/A"}</td>
                 <td>{item?.Role || "N/A"}</td>
                 <td
                   style={{
                     textAlign: "center",
                     width: "100px",
                     height: "100px",
                   }}
                 >
                   {/* <ToggleButton
                     className="mb-2"
                     style={{ margin: "auto" }}
                     id="toggle-check"
                     type="checkbox"
                     variant="outline-primary"
                     checked={checked}
                     disabled={props?.data?.ProjectType?.includes(
                       item?.UserId
                     )}
                     onChange={(e) => {
                       setChecked(e.currentTarget.checked);
                     }}
                   >
                     Select
                   </ToggleButton> */}

                   <Button
                     onClick={() => {
                       if (
                         !JSON.stringify(
                           props?.volunteerList || []
                         )?.includes(item?.UserId)
                       ) {
                         props?.setVolunteerList(item, true);
                       } else {
                         props?.setVolunteerList(item, false);
                       }
                     }}
                   >
                     {!JSON.stringify(props?.volunteerList || [])?.includes(
                       item?.UserId
                     )
                       ? "select"
                       : "Unselect"}
                   </Button>
                 </td>
               </tr>
             </tbody>
              )} 
           </>
            );
          })}:
        </Table>
      )}
    </div>
  );
}
function VolunteerTable(props) {
  console.log(props)
  return (
    <>
    <h1 style={{ marginTop: "50px" }}>
              Current Volunteers 
            </h1>
      <div>
        <Table striped bordered hover style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          {JSON.parse(props?.data.ProjectType || "[]")?.length > 0 ? (
            JSON.parse(props?.data.ProjectType || "[]").map((item) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{item?.UserId || "N/A"}</td>
                      <td>{item?.username || "N/A"}</td>
                      <td>{item?.Email || "N/A"}</td>
                      <td>{item?.Role || "N/A"}</td>

                      <td>
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            props?.deleteVolunteer(item);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })
          ) : (
            <div style={{ textAlign: "center" }}>
              <h1>No volunteers allocated to this project!</h1>
            </div>
          )}
        </Table>
      </div>
    </>
  );
}
