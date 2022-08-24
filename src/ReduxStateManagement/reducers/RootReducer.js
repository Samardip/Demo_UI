import { ActionTypes } from "../content/action-type";
const initialState = 0;
export const togglePassword = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE:
      return state + 1;
    default:
      return state;
  }
};
const trueFalseState = 0;
export const DecideState = (state = trueFalseState, action) => {
  switch (action.type) {
    case ActionTypes.TRUE_OR_FALSE_STATE:
      return state + 1;
    default:
      return state;
  }
};

const edustate = 0;
export const EduState = (state = edustate, action) => {
  switch (action.type) {
    case ActionTypes.EDUCATION_STATE:
      return state + 1;
    default:
      return state;
  }
};
const schoState = 0;
export const Schostate = (state = schoState, action) => {
  switch (action.type) {
    case ActionTypes.SCHOLARSHIP_STATE:
      return state + 1;
    default:
      return state;
  }
};

const email = "";
const pass = "";
export const EmailDetail = (state = email, action) => {
  switch (action.type) {
    case ActionTypes.SET_EMAIL:
      return action.payload;
    default:
      return state;
  }
};
export const PasswordDetail = (state = pass, action) => {
  switch (action.type) {
    case ActionTypes.SET_PASSWORD:
      return action.payload;
    default:
      return state;
  }
};
const datas = [{}];
export const data = (state = datas, action) => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return action.payload;
    default:
      return state;
  }
};
const datas1 = [{}];
export const data1 = (state = datas1, action) => {
  switch (action.type) {
    case ActionTypes.PRINT_STATE:
      return action.payload;
    default:
      return state;
  }
};
const loginState = 0;
export const loginResult = (state = loginState, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOGIN_RESULT:
      return state + action.payload;
    default:
      return state;
  }
};
const studentDetails = {
  user_id: [],
  user_name: [],
  date_of_birth: [],
  email_id: [],
  mobile_number: [],
  country_name: [],
};
const State = {
  datas: [],
};
export const SDetails = (state = State, action) => {
  switch (action.type) {
    case ActionTypes.SET_STUDENT_DETAILS:
      return { ...state, datas: action.payload };
    default:
      return state;
  }
};
export const studentTable = (state = studentDetails, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_ID:
      return {
        // ...state,
        user_id: action.payload,
      };
    case ActionTypes.SET_USER_NAME:
      return {
        ...state,
        user_name: action.payload,
      };
    case ActionTypes.SET_DATE_OF_BIRTH:
      return {
        ...state,
        date_of_birth: action.payload,
      };
    case ActionTypes.SET_EMAIL_ID:
      return {
        ...state,
        email_id: action.payload,
      };
    case ActionTypes.SET_MOBILE_NUMBER:
      return {
        ...state,
        mobile_number: action.payload,
      };
    case ActionTypes.SET_COUNTRY_NAME:
      return {
        ...state,
        country_name: action.payload,
      };
    default:
      return state;
  }
};
const searchName = "";
export const search_name = (state = searchName, action) => {
  switch (action.type) {
    case ActionTypes.NAME_DATA_TO_SEARCH:
      return action.payload;
    default:
      return state;
  }
};
const searchState = 0;
export const search_result = (state = searchState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH_STATE:
      return action.payload;
    default:
      return state;
  }
};
const State1 = {
  Bannerdata: [],
};
export const BDetails = (state = State1, action) => {
  switch (action.type) {
    case ActionTypes.BANNERDATA:
      return {
        ...state,
        Bannerdata: action.payload,
      };
    default:
      return state;
  }
};
const State2 = {
  Scrolldata: [],
  LikeNewsData: [],
  DisplayFavorites: [],
  FollowedNewsData: [],
};
export const ScrollDetails = (state = State2, action) => {
  switch (action.type) {
    case ActionTypes.SCROLLDATA:
      return {
        ...state,
        Scrolldata: action.payload,
      };
    case ActionTypes.NEWS_LIKE:
      return {
        ...state,
        LikeNewsData: action.payload,
      };
    case ActionTypes.DISPLAY_FAVORITE:
      return {
        ...state,
        DisplayFavorites: action.payload,
      };
    case ActionTypes.FOLLOWED_NEWS:
      return {
        ...state,
        FollowedNewsData: action.payload,
      };
    default:
      return state;
  }
};
const ProfileDatas = [];
export const ProfileData = (state = ProfileDatas, action) => {
  switch (action.type) {
    case ActionTypes.USER_PROFILE_VIEW_DATA:
      return action.payload;
    default:
      return state;
  }
};
const updateList = {
  Description: "",
  Education: [],
  EducationData: [],
  OptionDatas: [{}],
  UserEducationData: [{}],
  ScholarshipOptions: [],
  scholarshipData: [],
  userScholarshipData: [],
  Condition: [],
  Typeofjob: [],
  LanguageOption: [],
  Language: [],
  LanguageData: [],
  Level: [],
  IOptions: [],
  IData: [],
  IState: [],
  SkillOption: [],
  SkillData: [],
  SkillState: [],
  IndustryOption: [],
  IndustryState: [],
  Resumedetail: [],
  CompanyLocation: [],
  LocationOptions: [],
  SalaryState: [],
  SalaryData: [],
  SalaryOptions: [],
  EmploymentType: [],
  ExperienceState:[],
  ExperienceData:[],
  ExperienceOptions:[],
};
export const UpdateDatas = (state = updateList, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_DESCRIPTION:
      return { ...state, Description: action.payload };
    case ActionTypes.UPDATE_EDUCATION:
      return {
        ...state,
        Education: action.payload,
      };
    case ActionTypes.EDUCATION_FIELDS_NAME:
      return {
        ...state,
        EducationData: action.payload,
      };
    case ActionTypes.OPTION_DATA:
      return {
        ...state,
        OptionDatas: action.payload,
      };
    case ActionTypes.USER_EDUCATION_DATA:
      return {
        ...state,
        UserEducationData: action.payload,
      };
    case ActionTypes.SCHOLARSHIP_OPTION_DATA:
      return {
        ...state,
        ScholarshipOptions: action.payload,
      };
    case ActionTypes.SCHOLARSHIP_DATA:
      return {
        ...state,
        scholarshipData: action.payload,
      };
    case ActionTypes.USER_SCHOLARSHIP_DATA:
      return {
        ...state,
        userScholarshipData: action.payload,
      };
    case ActionTypes.CONDITION_YES_NO_DATA:
      return {
        ...state,
        Condition: action.payload,
      };
    case ActionTypes.TYPE_OF_JOB:
      return {
        ...state,
        Typeofjob: action.payload,
      };
    case ActionTypes.LANGUAGE_OPTION_DATA:
      return {
        ...state,
        LanguageOption: action.payload,
      };
    case ActionTypes.LANGUAGE_STATE:
      return {
        ...state,
        Language: action.payload,
      };
    case ActionTypes.LANGUAGE_DATA:
      return {
        ...state,
        LanguageData: action.payload,
      };
    case ActionTypes.LEVEL_OPTION:
      return {
        ...state,
        Level: action.payload,
      };
    case ActionTypes.INTERESTED_OPTIONS:
      return {
        ...state,
        IOptions: action.payload,
      };
    case ActionTypes.INTERESTED_DATA:
      return {
        ...state,
        IData: action.payload,
      };
    case ActionTypes.INTERESTED_STATE:
      return {
        ...state,
        IState: action.payload,
      };
    case ActionTypes.SKILL_STATE:
      return {
        ...state,
        SkillState: action.payload,
      };
    case ActionTypes.SKILL_DATA:
      return {
        ...state,
        SkillData: action.payload,
      };
    case ActionTypes.SKILL_OPTIONS:
      return {
        ...state,
        SkillOption: action.payload,
      };
    case ActionTypes.INDUSTRY_OPTION:
      return {
        ...state,
        IndustryOption: action.payload,
      };
    case ActionTypes.INDUSTRY_STATE:
      return {
        ...state,
        IndustryState: action.payload,
      };
    case ActionTypes.RESUME_NAME:
      return {
        ...state,
        Resumedetail: action.payload,
      };
    case ActionTypes.COMPANY_LOCATION:
      return {
        ...state,
        CompanyLocation: action.payload,
      };
    case ActionTypes.COMPANY_OPTIONS:
      return {
        ...state,
        LocationOptions: action.payload,
      };
    case ActionTypes.SALARY_STATE:
      return {
        ...state,
        SalaryState: action.payload,
      };
      case ActionTypes.SALARY_DATA:
      return {
        ...state,
        SalaryData: action.payload,
      };
      case ActionTypes.SALARY_OPTIONS:
      return {
        ...state,
        SalaryOptions: action.payload,
      };
      case ActionTypes.EMPLOYMENT_TYPE:
      return {
        ...state,
        EmploymentType: action.payload,
      };
      case ActionTypes.EXPERIENCED_STATE:
      return {
        ...state,
        ExperienceState: action.payload,
      };
      case ActionTypes.EXPERIENCED_DATA:
      return {
        ...state,
        ExperienceData: action.payload,
      };
      case ActionTypes.EXPERIENCED_OPTIONS:
      return {
        ...state,
        ExperienceOptions: action.payload,
      };

    default:
      return state;
  }
};
