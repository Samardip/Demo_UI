import { ActionTypes } from "../content/action-type";
export const toggle = () => {
  return {
    type: ActionTypes.TOGGLE,
  };
};
export const setEmail = (value) => {
  return {
    type: ActionTypes.SET_EMAIL,
    payload: value,
  };
};
export const setPassword = (value1) => {
  return {
    type: ActionTypes.SET_PASSWORD,
    payload: value1,
  };
};
export const setData = (data) => {
  return {
    type: ActionTypes.SET_DATA,
    payload: data,
  };
};
export const setLoginResult = (value) => {
  return {
    type: ActionTypes.SET_LOGIN_RESULT,
    payload: value,
  };
};
/////////////////////////////////////////////////////
export const setStudentDetails = (data) => {
  return {
    type: ActionTypes.SET_STUDENT_DETAILS,
    payload: data,
  };
};

export const setuser_id = (value) => {
  return {
    type: ActionTypes.SET_USER_ID,
    payload: value,
  };
};
export const setuser_name = (value) => {
  return {
    type: ActionTypes.SET_USER_NAME,
    payload: value,
  };
};
export const setdate_of_birth = (value) => {
  return {
    type: ActionTypes.SET_DATE_OF_BIRTH,
    payload: value,
  };
};
export const setemail_id = (value) => {
  return {
    type: ActionTypes.SET_EMAIL_ID,
    payload: value,
  };
};
export const setmobile_number = (value) => {
  return {
    type: ActionTypes.SET_MOBILE_NUMBER,
    payload: value,
  };
};
export const setcountry_name = (value) => {
  return {
    type: ActionTypes.SET_COUNTRY_NAME,
    payload: value,
  };
};
export const Search_name_data = (value) => {
  return {
    type: ActionTypes.NAME_DATA_TO_SEARCH,
    payload: value,
  };
};
export const setSearchState = (value) => {
  return {
    type: ActionTypes.SEARCH_STATE,
    payload: value,
  };
};
export const printSearchState = (value) => {
  return {
    type: ActionTypes.PRINT_STATE,
    payload: value,
  };
};
export const BannerData = (value) => {
  return {
    type: ActionTypes.BANNERDATA,
    payload: value,
  };
};
export const ScrollNewsData = (value) => {
  return {
    type: ActionTypes.SCROLLDATA,
    payload: value,
  };
};
export const NewsLike = (value) => {
  return {
    type: ActionTypes.NEWS_LIKE,
    payload: value,
  };
};
export const DisplayFavorites = (value) => {
  return {
    type: ActionTypes.DISPLAY_FAVORITE,
    payload: value,
  };
};
export const FollowedNews = (value) => {
  return {
    type: ActionTypes.FOLLOWED_NEWS,
    payload: value,
  };
};
export const UserProfileData = (value) => {
  return {
    type: ActionTypes.USER_PROFILE_VIEW_DATA,
    payload: value,
  };
};
export const UpdateDesc = (value) => {
  return {
    type: ActionTypes.UPDATE_DESCRIPTION,
    payload: value,
  };
};
export const UpdateEducation = (value) => {
  return {
    type: ActionTypes.UPDATE_EDUCATION,
    payload: value,
  };
};
export const TrueFalseState = () => {
  return {
    type: ActionTypes.TRUE_OR_FALSE_STATE,
  };
};
export const EducationDatas = (value) => {
  return {
    type: ActionTypes.EDUCATION_FIELDS_NAME,
    payload: value,
  };
};
export const OptionData = (value) => {
  return {
    type: ActionTypes.OPTION_DATA,
    payload: value,
  };
};
export const UserEducationData = (value) => {
  return {
    type: ActionTypes.USER_EDUCATION_DATA,
    payload: value,
  };
};
export const EducationState = (value) => {
  return {
    type: ActionTypes.EDUCATION_STATE,
    payload: value,
  };
};
export const ScholarshipState = (value) => {
  return {
    type: ActionTypes.SCHOLARSHIP_STATE,
    payload: value,
  };
};
export const ScholarshipOptions = (value) => {
  return {
    type: ActionTypes.SCHOLARSHIP_OPTION_DATA,
    payload: value,
  };
};
export const ScholarshipData = (value) => {
  return {
    type: ActionTypes.SCHOLARSHIP_DATA,
    payload: value,
  };
};
export const UserScholarshipData = (value) => {
  return {
    type: ActionTypes.USER_SCHOLARSHIP_DATA,
    payload: value,
  };
};
export const ConditionData = (value) => {
  return {
    type: ActionTypes.CONDITION_YES_NO_DATA,
    payload: value,
  };
};
export const JobType = (value) => {
  return {
    type: ActionTypes.TYPE_OF_JOB,
    payload: value,
  };
};
export const LanguageState = (value) => {
  return {
    type: ActionTypes.LANGUAGE_STATE,
    payload: value,
  };
};
export const LanguageOptionData = (value) => {
  return {
    type: ActionTypes.LANGUAGE_OPTION_DATA,
    payload: value,
  };
};
export const LanguageData = (value) => {
  return {
    type: ActionTypes.LANGUAGE_DATA,
    payload: value,
  };
};
export const setLevel = (value) => {
  return {
    type: ActionTypes.LEVEL_OPTION,
    payload: value,
  };
};
export const setInterestState = (value) => {
  return {
    type: ActionTypes.INTERESTED_STATE,
    payload: value,
  };
};
export const setInterestData = (value) => {
  return {
    type: ActionTypes.INTERESTED_DATA,
    payload: value,
  };
};
export const setInterestOptions = (value) => {
  return {
    type: ActionTypes.INTERESTED_OPTIONS,
    payload: value,
  };
};
export const setSkillOption = (value) => {
  return {
    type: ActionTypes.SKILL_OPTIONS,
    payload: value,
  };
};
export const setSkillState = (value) => {
  return {
    type: ActionTypes.SKILL_STATE,
    payload: value,
  };
};
export const setSkillData = (value) => {
  return {
    type: ActionTypes.SKILL_DATA,
    payload: value,
  };
};
export const setIndustryFieldState = (value) => {
  return {
    type: ActionTypes.INDUSTRY_STATE,
    payload: value,
  };
};
export const setIndustryFieldOptions = (value) => {
  return {
    type: ActionTypes.INDUSTRY_OPTION,
    payload: value,
  };
};
export const setResumeName = (value) => {
  return {
    type: ActionTypes.RESUME_NAME,
    payload: value,
  };
};
export const setCompanyLocation = (value) => {
  return {
    type: ActionTypes.COMPANY_LOCATION,
    payload: value,
  };
};
export const setLocationOptions = (value) => {
  return {
    type: ActionTypes.COMPANY_OPTIONS,
    payload: value,
  };
};
export const setSalaryState = (value) => {
  return {
    type: ActionTypes.SALARY_STATE,
    payload: value,
  };
};
export const setSalaryDatas = (value) => {
  return {
    type: ActionTypes.SALARY_DATA,
    payload: value,
  };
};
export const setSalaryOptions = (value) => {
  return {
    type: ActionTypes.SALARY_OPTIONS,
    payload: value,
  };
};
export const setEmploymentType = (value) => {
  return {
    type: ActionTypes.EMPLOYMENT_TYPE,
    payload: value,
  };
};
export const setExperienceState = (value) => {
  return {
    type: ActionTypes.EXPERIENCED_STATE,
    payload: value,
  };
};
export const setExperienceData = (value) => {
  return {
    type: ActionTypes.EXPERIENCED_DATA,
    payload: value,
  };
};
export const setExperienceOptions = (value) => {
  return {
    type: ActionTypes.EXPERIENCED_OPTIONS,
    payload: value,
  };
};