import React from "react";
import { useState, useEffect, useRef } from "react";
import { Loading } from "../../Components/appCommon";
import DatapageLayout from "../PageLayoutEmpty";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Cell,
  ListTable,
  HeaderRow,
  ExpandableRow,
} from "../../Components/tableComponents";
import { FaFileWord } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
export default class Project extends React.Component {
  // state = {
  //   content: null,
  //   headers: [],
  //   loading: true,
  //   settings: {},
  //   error: "",
  // };

  state = {
    content: null,
    pinned: null,
    archived: null,
    timeline: null,
    budget: null,
    headers: [],
    loading: true,
    settings: {},
    settingsTimeline: {},
    error: "",
    allContent: null,
  };

  settings = {
    title: "Project",
    primaryColor: "#a6192e",
    accentColor: "#94795d",
    textColor: "#ffffff",
    textColorInvert: "#606060",
    api: "/api/Project/",
  };
  settingsTimeline = {
    title: "Timeline",
    primaryColor: "#a6192e",
    accentColor: "#94795d",
    textColor: "#ffffff",
    textColorInvert: "#606060",
    api: "/api/Timeline/",
  };

  has = {
    Create: true,
    Generate: false,
    Delete: false,
  };

  async componentDidMount() {
    //-------------------------------------------TO BE UPDATED---------------------------------------//
    await this.getAllContent().then((allContent) => {
      console.log("here");
      console.log(allContent);
      this.setState({
        allContent: allContent,
      });
    });
    await this.getPinned().then((pinned) => {
      console.log(pinned);
      this.setState({
        pinned: pinned,
      });
    });
    await this.getArchived().then((archived) => {
      console.log(archived);
      this.setState({
        archived: archived,
      });
    });
    await this.getTimeline().then((data) => {
      console.log(data);
      this.setState({
        timeline: data,
      });
    });
    await this.getBudget().then((data) => {
      console.log(data);
      this.setState({
        budget: data,
      });
    });
    //-------------------------------------------TO BE UPDATED---------------------------------------//

    await this.getContent().then((content) => {
      console.log(content);
      this.setState({
        content: content,
      });
    });

    await this.getSettings().then((settings) => {
      console.log(settings);
      this.setState({
        settings: settings,
      });
    });
    await this.getSettingsTimeline().then((settings) => {
      console.log(settings);
      this.setState({
        settingsTimeline: settings,
      });
    });

    this.setState({
      loading: false,
    });
    //-------------------------------------------TO BE UPDATED---------------------------------------//
    const perms = await this.props.permissions.find(
      (p) => p.Module === "Project"
    );
    const reformattedPerms = [];
    Object.keys(perms).forEach((perm) => {
      return perm === "Module"
        ? null
        : perms[perm] === true
        ? reformattedPerms.push(perm)
        : null;
    });

    this.setState({
      data: this.props.data,
      perms: perms,
    });
    //-------------------------------------------TO BE UPDATED---------------------------------------//
  }
  //-------------------------------------------TO BE UPDATED---------------------------------------//
  getAllContent = async () => {
    return fetch(this.settings.api + "All", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };
  // getContent = async () => {
  //   return fetch(this.settings.api + "GetProjectInProgress", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //     //Res = {success: true, message: "Success", data: Array(3)}
  //     return res.json();
  //   });
  // };
  getPinned = async () => {
    return fetch(this.settings.api + "GetProjectPinned", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };

  getArchived = async () => {
    return fetch(this.settings.api + "GetProjectArchived", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };
  getTimeline = async () => {
    return fetch(this.settings.api + "Timeline", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };
  getBudget = async () => {
    return fetch(this.settings.api + "Budget", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };

  //-------------------------------------------TO BE UPDATED---------------------------------------//

  //------------------------------------------------TO BE UPDATED---------------------------------------//
  //pin
  updateStatusToPinned = async (data) => {
    console.log(data);
    return fetch(this.settings.api + "UpdateStatusToPinned/" + data.ProjectId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      return res.json();
    });
  };
  //pin
  handleUpdateStatusToPinned = async (data) => {
    console.log("Data: " + data);
    await this.updateStatusToPinned(data).then((content) => {
      if (content.success) {
        console.log("Pin success");
        this.setState({
          error: "",
        });
        return true;
      } else {
        console.log("Pin fail");
        this.setState({
          error: content.message,
        });
        return false;
      }
    });
  };

  //archive
  updateStatusToArchive = async (data) => {
    console.log(data);
    return fetch(
      this.settings.api + "UpdateStatusToArchive/" + data.ProjectId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then(async (res) => {
      return res.json();
    });
  };

  //archive
  handleUpdateStatusToArchive = async (data) => {
    console.log("Data: " + data);
    await this.updateStatusToArchive(data).then((content) => {
      if (content.success) {
        console.log("Archive success");
        this.setState({
          error: "",
        });
        return true;
      } else {
        console.log("Archive fail");
        this.setState({
          error: content.message,
        });
        return false;
      }
    });
  };

  //update to in progress
  updateStatusToInProgress = async (data) => {
    console.log(data);
    return fetch(
      this.settings.api + "UpdateStatusToInProgress/" + data.ProjectId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then(async (res) => {
      return res.json();
    });
  };

  //update to in progress
  handleUpdateStatusToInProgress = async (data) => {
    console.log("Data: " + data);
    await this.updateStatusToInProgress(data).then((content) => {
      if (content.success) {
        console.log("Unpin success");
        this.setState({
          error: "",
        });
        return true;
      } else {
        console.log("Unpin fail");
        this.setState({
          error: content.message,
        });
        return false;
      }
    });
  };

  requestPinned = async () => {
    this.setState({
      loading: true,
    });
    await this.getPinned().then((pinned) => {
      console.log(pinned);
      this.setState({
        pinned: pinned,
        loading: false,
      });
    });
  };
  requestArchived = async () => {
    this.setState({
      loading: true,
    });
    await this.getArchived().then((archived) => {
      console.log(archived);
      this.setState({
        archived: archived,
        loading: false,
      });
    });
  };
  //------------------------------------------------TO BE UPDATED---------------------------------------//

  //------------------------------------------------TO BE UPDATED---------------------------------------//
  getChartData1 = (startDate, endDate, budget) => {
    const startMonth = new Date(startDate).getMonth();
    const endMonth = new Date(endDate).getMonth();
    const labels = [];

    if (endMonth - startMonth < 2) {
      const startMonthName = new Date(startDate).toLocaleString("default", {
        month: "short",
      });
      const endMonthName = new Date(endDate).toLocaleString("default", {
        month: "short",
      });
      labels.push(startMonthName, endMonthName);
    } else {
      for (let i = startMonth; i <= endMonth; i++) {
        labels.push(
          new Date(2023, i, 1).toLocaleString("default", { month: "short" })
        );
      }
    }

    const totalMonths = labels.length;
    const data = [];
    let remainingBudget = budget;
    for (let i = 0; i < totalMonths; i++) {
      let estimatedBudget;

      if (totalMonths === 1) {
        estimatedBudget = budget;
      } else if (totalMonths === 2) {
        estimatedBudget = budget / 2;
      } else if (i === 0 || i === totalMonths - 1) {
        estimatedBudget = remainingBudget / 3;
      } else {
        const factor = Math.abs(i - (totalMonths - 1) / 2);
        estimatedBudget =
          (remainingBudget * (factor + 1)) /
          ((totalMonths * (totalMonths + 1)) / 4);
      }

      estimatedBudget = Math.round(estimatedBudget * 100) / 100;

      data.push(estimatedBudget);
      remainingBudget -= estimatedBudget;
    }

    return {
      labels,
      datasets: [
        {
          label: "Estimated Budget",
          data,
          backgroundColor: "#a6192e",
          borderColor: "#a6192e",
          borderWidth: 1,
        },
      ],
    };
  };

  getChartData2 = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    const labels = [];
    const data = [];

    let currentDate = start;
    while (currentDate <= end) {
      const formattedDate = currentDate.toLocaleString("en-US", {
        month: "short",
      });
      labels.push(formattedDate);

      if (currentDate <= today) {
        data.push(
          daysLeft - Math.ceil((today - currentDate) / (1000 * 60 * 60 * 24))
        );
      } else {
        data.push(
          daysLeft - Math.ceil((currentDate - today) / (1000 * 60 * 60 * 24))
        );
      }

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "daysleft",
          data: data,
          backgroundColor: "#94795d",
        },
      ],
    };
  };

  getChartData3 = (completed, inProgress) => {
    return {
      labels: ["Completed Project", "In Progress Projects"],
      datasets: [
        {
          label: "Projects",
          data: [completed - inProgress, inProgress],
          backgroundColor: ["#5463FF", "#FF1818"],
        },
      ],
    };
  };
  //------------------------------------------------TO BE UPDATED---------------------------------------//

  getSettings = async () => {
    // fetches http://...:5001/api/User/Settings
    return fetch(this.settings.api + "Settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  };
  getSettingsTimeline = async () => {
    // fetches http://...:5001/api/User/Settings
    return fetch(this.settingsTimeline.api + "Settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
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
      console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };

  update = async (data) => {
    console.log(data);
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
  create = async (data) => {
    return fetch("https://localhost:5001/api/Project/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(function (res) {
      return res.json();
    });
  };
  delete = async (data) => {
    await fetch(`https://localhost:5001/api/Project/Delete/${data}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      return res.json();
    });
  };

  handleUpdate = async (data) => {
    await this.update(data).then((content) => {
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
      console.log(content);
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
      console.log(this.state.settings);
      console.log(this.state.settings.data.ColumnSettings);
      console.log(this.state.settingsTimeline.data.ColumnSettings);
      console.log(this.state.archived.data);
      return (
        <>
          <DatapageLayout
            settings={this.settings}
            fieldSettings={this.state.settings.data.FieldSettings}
            headers={this.state.settings.data.ColumnSettings}
            data={this.state.content.data}
            updateHandle={this.handleUpdate}
            requestRefresh={this.requestRefresh}
            error={this.state.error}
            permissions={this.props.permissions}
            requestError={this.requestError}
            has={this.has}
            extraComponents={[
              {
                label: "Archived Projects",
                key: "archivedProjects",
                requiredPerms: ["Create", "Update", "Delete", "Read"],
                component: (
                  <ViewManagement
                    settings={this.settings}
                    requestArchived={this.requestArchived}
                    updateHandle={this.props.updateHandle}
                    headers={this.state.settings.data.ColumnSettings}
                    fieldSettings={this.state.settings.data.FieldSettings}
                    setExpansionContent={this.props.setExpansionContent}
                    data={this.state.archived.data}
                    requestError={this.requestError}
                    api={this.settings.api}
                  ></ViewManagement>
                ),
              },
            ]}
          >
            <DisplayTables
              data={this.state.content.data}
              delete={this.delete}
              create={this.create}
            />

            {console.log(this.state.pinned.data)}
          </DatapageLayout>
        </>
      );
    }
  }
}

const DisplayTables = (props) => {
  const data = props.data;
  const deleteFn = props.delete;
  const createFn = props.create;
  let navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/Project/View/${id}`;
    navigate(path);
  };
  const routeReturn = () => {
    let path = `/Project`;
    navigate(path);
  };

  const countRef = useRef();
  const [projects, setProjects] = useState([]);
  const [archiveProjects, setArchiveProjects] = useState([]);
  const [pinnedProjects, setPinnedProjects] = useState([]);
  const [otherProjects, setOtherProjects] = useState([]);
  const [projRef, setProjRef] = useState();
  const [undo, setUndo] = useState(false);
  const [sorting, setSorting] = useState({
    field: "ProjectName",
    ascending: true,
  });
  const params = useParams();
  console.log(params);
  if (params.id) {
    console.log(params.id);
  } else {
    console.log("no params");
  }
  const options = {
    onClose: () => {
      console.log(countRef);
      if (countRef.current == null) {
        deleteFn(params.id);
      }
    },
    autoClose: 2000,
    hideProgressBar: true,
    className: "black-background",
    position: toast.POSITION.BOTTOM_CENTER,
  };

  //When delete is clicked, all details of the project will be copied and stored in temporary variable.
  useEffect(() => {
    // setProjects(data);
    const projectsCopy = [...data];
    const projectsFiltered = projectsCopy.filter((project) => {
      return project.ProjectId != params.id;
    });

    const projectsPinned = projectsFiltered.filter((project) => {
      return project.ProjectStatus == "Pinned";
    });

    const projectsArchived = projectsFiltered.filter((project) => {
      return project.ProjectStatus == "Archived";
    });

    const projectsOther = projectsFiltered.filter((project) => {
      return (
        !projectsArchived.includes(project) && !projectsPinned.includes(project)
      );
    });

    // console.log(`Filtered: ${projectsFiltered}`);
    // console.log(`Pinned: ${projectsPinned}`);
    // console.log(`Archived: ${projectsArchived}`);
    // console.log(`Other: ${projectsOther}`);

    setArchiveProjects(projectsArchived);
    setPinnedProjects(projectsPinned);
    setOtherProjects(projectsOther);
    // Apply sorting
    let sortedProjects = [];
    if (undo == true) {
      sortedProjects = projectsCopy
        .sort((a, b) => {
          console.log(a[sorting.field]);
          console.log(b[sorting.field]);
          if (typeof b[sorting.field] == "string") {
            if (b) {
              return a ? b[sorting.field]?.localeCompare(a[sorting.field]) : 1;
            } else if (a) {
              return b ? a[sorting.field]?.localeCompare(b[sorting.field]) : -1;
            }
          } else if (typeof b[sorting.field] == "number") {
            if (b) {
              return a ? b[sorting.field] - a[sorting.field] : 1;
            } else if (a) {
              return b ? a[sorting.field] - b[sorting.field] : -1;
            }
          }
        })
        .slice();
    } else {
      setProjRef(
        projectsCopy.filter((project) => {
          return project.ProjectId == params.id;
        })
      );
      sortedProjects = projectsFiltered
        .sort((a, b) => {
          // console.log(a[sorting.field]);
          // console.log(typeof b[sorting.field]);
          if (typeof b[sorting.field] == "string") {
            if (b) {
              return a ? b[sorting.field]?.localeCompare(a[sorting.field]) : 1;
            } else if (a) {
              return b ? a[sorting.field]?.localeCompare(b[sorting.field]) : -1;
            }
          } else if (typeof b[sorting.field] == "number") {
            if (b) {
              return a ? b[sorting.field] - a[sorting.field] : 1;
            } else if (a) {
              return b ? a[sorting.field] - b[sorting.field] : -1;
            }
          }
        })
        .slice();
    }
    // Replace currentprojects with sorted currentprojects
    setProjects(
      // Decide either currentprojects sorted by ascending or descending order
      sorting.ascending ? sortedProjects : sortedProjects.reverse()
    );
  }, [data, sorting, undo]);
  useEffect(() => {
    if (data.length > projects.length && projects.length != 0) {
      notify();
      //   console.log(data.length)
      // console.log(projects.length)
    }
  }, [projects]);
  //Toast Message is created to allow users to undo deletion of project
  const notify = () => {
    toast.info(undoToastBtn, options);
  };
  const undoToastBtn = () => (
    <button
      ref={countRef}
      onClick={() => {
        setUndo(true);
        const proj = {
          ProjectName: projRef[0].ProjectName,
          ProjectDescription: projRef[0].ProjectDescription,
          ProjectBudget: projRef[0].ProjectBudget,
          ProjectStartDate: projRef[0].ProjectStartDate,
          ProjectEndDate: projRef[0].ProjectEndDate,
          ProjectCompletionDate: projRef[0].ProjectCompletionDate,
          ProjectVolunteer: projRef[0].ProjectVolunteer,
          ProjectStatus: projRef[0].ProjectStatus,
          // ProjectType: projRef[0].ProjectType,
          ServiceCenterId: projRef[0].ServiceCenterId,
        };
        console.log(proj);
        handleCreate(proj);
        routeReturn();
      }}
    >
      Undo
    </button>
  );

  const handleCreate = async (proj) => await createFn(proj);

  function applySorting(key, ascending) {
    setSorting({ field: key, ascending: ascending });
  }

  console.log(projects);

  return (
    <>
      <div>
        <h1>Pinned Projects</h1>
      </div>
      <ProjectTable
        projects={pinnedProjects}
        applySorting={applySorting}
        routeChange={routeChange}
        sorting={sorting}
      />
      <div>
        <h1>Other Projects</h1>
      </div>
      <ProjectTable
        projects={otherProjects}
        applySorting={applySorting}
        routeChange={routeChange}
        sorting={sorting}
      />
    </>
  );
};

const ProjectTable = (props) => {
  const projects = props.projects;
  const applySorting = props.applySorting;
  const routeChange = props.routeChange;
  const sorting = props.sorting;

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => applySorting("ProjectName", !sorting.ascending)}>
              Project Name
            </th>
            <th
              colSpan={2}
              onClick={() =>
                applySorting("ProjectDescription", !sorting.ascending)
              }
            >
              Project Description
            </th>
            <th
              onClick={() =>
                applySorting("ProjectVolunteer", !sorting.ascending)
              }
            >
              Project Type
            </th>
            <th
              onClick={() => applySorting("ProjectBudget", !sorting.ascending)}
            >
              Project Budget
            </th>
            <th
              onClick={() =>
                applySorting("ProjectStartDate", !sorting.ascending)
              }
            >
              Start Date
            </th>
            <th
              onClick={() => applySorting("ProjectEndDate", !sorting.ascending)}
            >
              End Date
            </th>
            <th
              onClick={() => applySorting("ProjectStatus", !sorting.ascending)}
            >
              Project Status
            </th>
            <th>Action</th>
          </tr>
        </thead>
        {projects.map((item, key) => {
          return (
            <tbody key={key}>
              <tr>
                <td>{key + 1}</td>
                <td>{item.ProjectName}</td>
                <td colSpan={2}>
                  <>
                    {item.ProjectDescription}
                    {/* {JSON.parse(item.ProjectVolunteer || "[]")?.length > 0 ? (
                      <div className="mt-2">
                        <b>Volunteers: </b>
                        {JSON.parse(item.ProjectVolunteer || "[]")?.map((item) => (
                          <span>
                            {item?.username} <span></span>
                          </span>
                        )) || "N/A"}
                      </div>
                    ) : null} */}
                  </>
                </td>
                {/* <td>{item.ProjectVolunteer}</td> */}
                <td>{item.ProjectBudget ? item.ProjectBudget : "Not set"}</td>
                <td>{item.ProjectStartDate}</td>
                <td>{item.ProjectEndDate}</td>
                <td>{item.ProjectStatus}</td>
                <td>
                  <button onClick={() => routeChange(item.ProjectId)}>
                    View
                  </button>
                  {/* <button onClick={() => setUndo(true)}>Undo</button> */}
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <ToastContainer theme="dark" />
    </>
  );
};

const PinnedProjectTable = (props) => {
  const data = props.data;
  const deleteFn = props.delete;
  const createFn = props.create;
  let navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/Project/View/${id}`;
    navigate(path);
  };
  const routeReturn = () => {
    let path = `/Project`;
    navigate(path);
  };

  const countRef = useRef();
  const [projects, setProjects] = useState([]);
  const [projRef, setProjRef] = useState();
  const [undo, setUndo] = useState(false);
  const [sorting, setSorting] = useState({
    field: "ProjectName",
    ascending: true,
  });
  const params = useParams();
  console.log(params);
  if (params.id) {
    console.log(params.id);
  } else {
    console.log("no params");
  }
  const options = {
    onClose: () => {
      console.log(countRef);
      if (countRef.current == null) {
        deleteFn(params.id);
      }
    },
    autoClose: 2000,
    hideProgressBar: true,
    className: "black-background",
    position: toast.POSITION.BOTTOM_CENTER,
  };

  //When delete is clicked, all details of the project will be copied and stored in temporary variable.
  useEffect(() => {
    // setProjects(data);
    const projectsCopy = [...data];
    const projectsFiltered = projectsCopy.filter((project) => {
      return project.ProjectStatus == "Pinned";
    });

    console.log(projectsFiltered);
    // Apply sorting
    let sortedProjects = [];
    if (undo == true) {
      sortedProjects = projectsCopy
        .sort((a, b) => {
          console.log(a[sorting.field]);
          console.log(b[sorting.field]);
          if (typeof b[sorting.field] == "string") {
            if (b) {
              return a ? b[sorting.field]?.localeCompare(a[sorting.field]) : 1;
            } else if (a) {
              return b ? a[sorting.field]?.localeCompare(b[sorting.field]) : -1;
            }
          } else if (typeof b[sorting.field] == "number") {
            if (b) {
              return a ? b[sorting.field] - a[sorting.field] : 1;
            } else if (a) {
              return b ? a[sorting.field] - b[sorting.field] : -1;
            }
          }
        })
        .slice();
    } else {
      setProjRef(
        projectsCopy.filter((project) => {
          return project.ProjectId == params.id;
        })
      );
      sortedProjects = projectsFiltered
        .sort((a, b) => {
          console.log(a[sorting.field]);
          console.log(typeof b[sorting.field]);
          if (typeof b[sorting.field] == "string") {
            if (b) {
              return a ? b[sorting.field]?.localeCompare(a[sorting.field]) : 1;
            } else if (a) {
              return b ? a[sorting.field]?.localeCompare(b[sorting.field]) : -1;
            }
          } else if (typeof b[sorting.field] == "number") {
            if (b) {
              return a ? b[sorting.field] - a[sorting.field] : 1;
            } else if (a) {
              return b ? a[sorting.field] - b[sorting.field] : -1;
            }
          }
        })
        .slice();
    }
    // Replace currentprojects with sorted currentprojects
    setProjects(
      // Decide either currentprojects sorted by ascending or descending order
      sorting.ascending ? sortedProjects : sortedProjects.reverse()
    );
  }, [data, sorting, undo]);
  useEffect(() => {
    if (data.length > projects.length && projects.length != 0) {
      notify();
      //   console.log(data.length)
      // console.log(projects.length)
    }
  }, [projects]);
  //Toast Message is created to allow users to undo deletion of project
  const notify = () => {
    toast.info(undoToastBtn, options);
  };
  const undoToastBtn = () => (
    <button
      ref={countRef}
      onClick={() => {
        setUndo(true);
        const proj = {
          ProjectName: projRef[0].ProjectName,
          ProjectDescription: projRef[0].ProjectDescription,
          ProjectVolunteer: projRef[0].ProjectVolunteer,
          ProjectBudget: projRef[0].ProjectBudget,
          ProjectStartDate: projRef[0].ProjectStartDate,
          ProjectEndDate: projRef[0].ProjectEndDate,
          ProjectStatus: projRef[0].ProjectStatus,
          ProjectCompletionDate: projRef[0].ProjectCompletionDate,
          ProjectVolunteer: projRef[0].ProjectVolunteer,
          ServiceCenterId: projRef[0].ServiceCenterId,
        };
        console.log(proj);
        handleCreate(proj);
        routeReturn();
      }}
    >
      Undo
    </button>
  );

  const handleCreate = async (proj) => await createFn(proj);

  function applySorting(key, ascending) {
    setSorting({ field: key, ascending: ascending });
  }

  console.log(projects);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => applySorting("ProjectName", !sorting.ascending)}>
              Project Name
            </th>
            <th
              colSpan={2}
              onClick={() =>
                applySorting("ProjectDescription", !sorting.ascending)
              }
            >
              Project Description
            </th>
            <th
              onClick={() =>
                applySorting("ProjectVolunteer", !sorting.ascending)
              }
            >
              Project Type
            </th>
            <th
              onClick={() => applySorting("ProjectBudget", !sorting.ascending)}
            >
              Project Budget
            </th>
            <th
              onClick={() =>
                applySorting("ProjectStartDate", !sorting.ascending)
              }
            >
              Start Date
            </th>
            <th
              onClick={() => applySorting("ProjectEndDate", !sorting.ascending)}
            >
              End Date
            </th>
            <th
              onClick={() => applySorting("ProjectStatus", !sorting.ascending)}
            >
              Project Status
            </th>
          </tr>
        </thead>
        {projects.map((item, key) => {
          return (
            <tbody key={key}>
              <tr>
                <td>{key + 1}</td>
                <td>{item.ProjectName}</td>
                <td colSpan={2}>
                  <>
                    {item.ProjectDescription}
                    {/* {JSON.parse(item.ProjectVolunteer || "[]")?.length > 0 ? (
                      <div className="mt-2">
                        <b>Volunteers: </b>
                        {JSON.parse(item.ProjectVolunteer || "[]")?.map((item) => (
                          <span>
                            {item?.username} <span></span>
                          </span>
                        )) || "N/A"}
                      </div>
                    ) : null} */}
                  </>
                </td>

                <td>{item.ProjectBudget}</td>
                <td>{item.ProjectStartDate}</td>
                <td>{item.ProjectEndDate}</td>
                <td>{item.ProjectStatus}</td>
                <td>
                  <button onClick={() => routeChange(item.ProjectId)}>
                    View
                  </button>
                  {/* <button onClick={() => setUndo(true)}>Undo</button> */}
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <ToastContainer theme="dark" />
    </>
  );
};

const ArchivedTable = (props) => {
  const data = props.data;
  const deleteFn = props.delete;
  const createFn = props.create;
  let navigate = useNavigate();
  const routeChange = (id) => {
    let path = `/Project/View/${id}`;
    navigate(path);
  };
  const routeReturn = () => {
    let path = `/Project`;
    navigate(path);
  };

  const countRef = useRef();
  const [projects, setProjects] = useState([]);
  const [projRef, setProjRef] = useState();
  const [undo, setUndo] = useState(false);
  const [sorting, setSorting] = useState({
    field: "ProjectName",
    ascending: true,
  });
  const params = useParams();
  console.log(params);
  if (params.id) {
    console.log(params.id);
  } else {
    console.log("no params");
  }
  const options = {
    onClose: () => {
      console.log(countRef);
      if (countRef.current == null) {
        deleteFn(params.id);
      }
    },
    autoClose: 2000,
    hideProgressBar: true,
    className: "black-background",
    position: toast.POSITION.BOTTOM_CENTER,
  };

  //When delete is clicked, all details of the project will be copied and stored in temporary variable.
  useEffect(() => {
    // setProjects(data);
    const projectsCopy = [...data];
    const projectsFiltered = projectsCopy.filter((project) => {
      return project.ProjectStatus == "Archived";
    });

    console.log(projectsFiltered);
    // Apply sorting
    let sortedProjects = [];
    if (undo == true) {
      sortedProjects = projectsCopy
        .sort((a, b) => {
          console.log(a[sorting.field]);
          console.log(b[sorting.field]);
          if (typeof b[sorting.field] == "string") {
            if (b) {
              return a ? b[sorting.field]?.localeCompare(a[sorting.field]) : 1;
            } else if (a) {
              return b ? a[sorting.field]?.localeCompare(b[sorting.field]) : -1;
            }
          } else if (typeof b[sorting.field] == "number") {
            if (b) {
              return a ? b[sorting.field] - a[sorting.field] : 1;
            } else if (a) {
              return b ? a[sorting.field] - b[sorting.field] : -1;
            }
          }
        })
        .slice();
    } else {
      setProjRef(
        projectsCopy.filter((project) => {
          return project.ProjectId == params.id;
        })
      );
      sortedProjects = projectsFiltered
        .sort((a, b) => {
          console.log(a[sorting.field]);
          console.log(typeof b[sorting.field]);
          if (typeof b[sorting.field] == "string") {
            if (b) {
              return a ? b[sorting.field]?.localeCompare(a[sorting.field]) : 1;
            } else if (a) {
              return b ? a[sorting.field]?.localeCompare(b[sorting.field]) : -1;
            }
          } else if (typeof b[sorting.field] == "number") {
            if (b) {
              return a ? b[sorting.field] - a[sorting.field] : 1;
            } else if (a) {
              return b ? a[sorting.field] - b[sorting.field] : -1;
            }
          }
        })
        .slice();
    }
    // Replace currentprojects with sorted currentprojects
    setProjects(
      // Decide either currentprojects sorted by ascending or descending order
      sorting.ascending ? sortedProjects : sortedProjects.reverse()
    );
  }, [data, sorting, undo]);
  useEffect(() => {
    if (data.length > projects.length && projects.length != 0) {
      notify();
      //   console.log(data.length)
      // console.log(projects.length)
    }
  }, [projects]);
  //Toast Message is created to allow users to undo deletion of project
  const notify = () => {
    toast.info(undoToastBtn, options);
  };
  const undoToastBtn = () => (
    <button
      ref={countRef}
      onClick={() => {
        setUndo(true);
        const proj = {
          ProjectName: projRef[0].ProjectName,
          ProjectDescription: projRef[0].ProjectDescription,
          ProjectBudget: projRef[0].ProjectBudget,
          ProjectStartDate: projRef[0].ProjectStartDate,
          ProjectEndDate: projRef[0].ProjectEndDate,
          ProjectStatus: projRef[0].ProjectStatus,
          ProjectCompletionDate: projRef[0].ProjectCompletionDate,
          ProjectVolunteer: projRef[0].ProjectVolunteer,
          ServiceCenterId: projRef[0].ServiceCenterId,
        };
        console.log(proj);
        handleCreate(proj);
        routeReturn();
      }}
    >
      Undo
    </button>
  );

  const handleCreate = async (proj) => await createFn(proj);

  function applySorting(key, ascending) {
    setSorting({ field: key, ascending: ascending });
  }

  console.log(projects);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => applySorting("ProjectName", !sorting.ascending)}>
              Project Name
            </th>
            <th
              colSpan={2}
              onClick={() =>
                applySorting("ProjectDescription", !sorting.ascending)
              }
            >
              Project Description
            </th>

            <th
              onClick={() => applySorting("ProjectBudget", !sorting.ascending)}
            >
              Project Budget
            </th>
            <th
              onClick={() =>
                applySorting("ProjectStartDate", !sorting.ascending)
              }
            >
              Start Date
            </th>
            <th
              onClick={() => applySorting("ProjectEndDate", !sorting.ascending)}
            >
              End Date
            </th>
            <th
              onClick={() => applySorting("ProjectStatus", !sorting.ascending)}
            >
              Project Status
            </th>
          </tr>
        </thead>
        {projects.map((item, key) => {
          console.log(item);
          return (
            <tbody key={key}>
              <tr>
                <td>{key + 1}</td>
                <td>{item.ProjectName}</td>
                <td colSpan={2}>
                  <>
                    {item.ProjectDescription}
                    {/* {JSON.parse(item.ProjectVolunteer || "[]")?.length > 0 ? (
                      <div className="mt-2">
                        <b>Volunteers: </b>
                        {JSON.parse(item.ProjectVolunteer || "[]")?.map((item) => (
                          <span>
                            {item?.username} <span></span>
                          </span>
                        )) || "N/A"}
                      </div>
                    ) : null} */}
                  </>
                </td>

                <td>{item.ProjectBudget ? item.ProjectBudget : "Not Set"}</td>
                <td>{item.ProjectStartDate}</td>
                <td>{item.ProjectEndDate}</td>
                <td>{item.ProjectStatus}</td>
                <td>
                  <button onClick={() => routeChange(item.ProjectId)}>
                    View
                  </button>
                  {/* <button onClick={() => setUndo(true)}>Undo</button> */}
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <ToastContainer theme="dark" />
    </>
  );
};

class ViewManagement extends React.Component {
  state = {
    drawerOpen: false,
    expanded: false,
    showBottomMenu: false,
    expansionContent: "",
    expansionComponent: "",
    popUpContent: "",
    data: this.props.data,
    itemsPerPage: 20,
    currentPage: 1,
    pageNumbers: [],
  };

  componentDidMount() {
    // let columns = [];
    // for(var i = 0; i < Object.keys(this.props.fieldSettings).length; i++){
    //     columns.push(
    //         {
    //             label: Object.keys(this.props.fieldSettings)[i],
    //             key: Object.keys(this.props.fieldSettings)[i],
    //         }
    //     );
    // }
    // this.setState({
    //     columns: columns
    // });
  }
  render() {
    if (this.state.content === "") {
      return <div></div>;
    }
    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    const currentItems = this.state.data.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    console.log("First and last: " + indexOfFirstItem + indexOfLastItem);
    return (
      <div>
        <div className="d-flex justify-content-center align-items-start flex-fill">
          <ListTable settings={this.settings}>
            <HeaderRow>
              {Object.keys(this.props.headers).map((key, index) => {
                return (
                  <Cell width={"100%"} key={index}>
                    {this.props.headers[key].displayHeader}
                  </Cell>
                );
              })}
            </HeaderRow>
            {this.state.data &&
              currentItems.map((row, index) => {
                return (
                  <ExpandableRow
                    updateHandle={this.props.updateHandle}
                    values={row}
                    fieldSettings={this.props.fieldSettings}
                    key={index}
                    settings={this.settings}
                    headers={this.props.headers}
                    setExpansionContent={this.setExpansionContent}
                    handleSeeMore={this.handleSeeMore}
                    handleClose={this.handleClose}
                    popUpContent={this.state.popUpContent}
                    perms={this.state.perms}
                  >
                    <br></br>
                    <button color="red">Unpin Project</button>
                    <br></br>
                    <br></br>Export to:
                    <FaFileWord size={30} />
                    <FaFilePdf size={30} />
                    <FaFileCsv size={30} />
                    {this.props.children
                      ? this.props.children[
                          index +
                            (this.state.currentPage - 1) *
                              this.state.itemsPerPage
                        ]
                      : ""}
                  </ExpandableRow>
                );
              })}
          </ListTable>
        </div>
      </div>
    );
  }
}
