import React from "react";
import { Route, Redirect } from "react-router-dom";
import QueueAnim from "rc-queue-anim";
import PropTypes from "prop-types";

import BrowseListPage from "./BrowseListPage";
import MessagePage from "./MessagePage";
import MyProfilePage from "./MyProfilePage";
import NavLinkBar from "./NavLinkBar";

class DashboardPage extends React.Component {
  render() {
    const navList = [
      {
        path: "/browse-list",
        text: "browse-list",
        icon: "job",
        title: "Browse",
        component: BrowseListPage
      },
      {
        path: "/message",
        text: "message",
        icon: "msg",
        title: "My Messages",
        component: MessagePage
      },
      {
        path: "/my-profile",
        text: "my-profile",
        icon: "user",
        title: "My Profile",
        component: MyProfilePage
      }
    ];
    const {
      location: { pathname }
    } = this.props;
    const page = navList.find(v => v.path === pathname);
    return page ? (
      <React.Fragment>
        <div className="dashboard-top">{page.title}</div>
        <QueueAnim className="dashboard-wrapper" type="scaleX" delay={300}>
          <Route path={page.path} component={page.component} key={page.path} />
        </QueueAnim>
        <nav className="dashboard-nav">
          <NavLinkBar data={navList} />
        </nav>
      </React.Fragment>
    ) : (
      <Redirect to="/message" />
    );
  }
}
DashboardPage.propTypes = {
  location: PropTypes.object.isRequired
};

export default DashboardPage;
