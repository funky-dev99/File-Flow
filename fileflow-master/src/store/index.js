import { proxy } from "valtio";

const state = proxy({
  currentUser: {},
  dashboardActiveIndex: 0,
  projects: [],
  files: [],
  selectedProject: {},
  canCreateProject: false,
  canDeleteFiles: false,
  canSeeUsers: false,
  canAddFiles: false,
  canCommentFiles: false,
});

export default state;
