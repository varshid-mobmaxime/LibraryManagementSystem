import {Icons} from '../assets';
import {Strings} from '../config/strings';

const DateFormat = {
  fullDay: 'D MMMM YYYY',
};
const Take = 10;
const STAGE = 'STAGE';
const PROD = 'PROD';
const DefaultOTPValue = '555522';
const USCountryCode = '+1';
const USCountryCodeWithFlag = '+1 🇺🇸';
const PrivacyPolicyUrl = 'https://thrivece.com/privacy-policy.html';
const ContactUsMail = 'info@thrivece.com';
const camera_unavailable = 'camera_unavailable';
const ContactUsMailSubject = 'Connect for Thrive Nurse application';
const iOSAppId = '6736705496';
const TAKE_TWENTY = 20;
const OTP_TIMER_LIMIT = 59;
const NurseAppChannel = 'nurseApp-channel';
const EmploymentFormVerification = 'EmploymentFormVerification';
const TimesheetUpdate = 'TimesheetUpdate';
const BackgroundCheckName = 'backgroundCheckName';
const CredentialTypeName = 'credentialTypeName';
const Chat = 'Chat';
const facebook = 'facebook';
const Insta = 'insta';
const Google = 'google';
const Apple = 'apple';
const Fb = 'fb';
const GET = 'GET';
const ios = 'ios';
const Android = 'android';
const NonAlphaNumericRegex = /[^a-zA-Z0-9.]/g;
const StatusInterView = {
  Default: 1,
  Scheduled: 2,
  InProgress: 3,
  Pending: 4,
  Approved: 5,
};
const JobDeclineStatus = {
  License: 'License',
  Interview: 'Interview',
  Screening: 'Screening',
  Documentation: 'Documentation',
  WithdrawnApplication: 'Withdrawn Application',
  ReleasedApplication: 'Released Application',
  ApplicationRejected: 'Application Rejected',
};
const JobStatus = {
  NotViewed: 1,
  Viewed: 2,
  SigningDocs: 3,
  InProgress: 4,
  PreBoarding: 5,
  Hired: 6,
  Withdrawn: 7,
  Declined: 8,
  Released: 9,
  Rejected: 10,
};

const InterviewStatus = {
  NotScheduled: 1,
  Scheduled: 2,
  InProgress: 3,
  Pending: 4,
  Approved: 5,
  Declined: 6,
};

const ScreeningStatus = {
  Completed: 3,
  ScreeningStarted: 2,
  ScreeningNotStarted: 1,
};
const CredentialStatus = {
  InProgress: 1,
  Approved: 2,
  Declined: 3,
  Unverified: 4,
};

const JobDocumentStatus = {
  Pending: 1,
  Signed: 2,
  Approved: 3,
  SentBack: 4,
  Declined: 5,
};

const GraduationTypeStatus = {
  Associates: 1,
  Bachelors: 2,
  Masters: 3,
  PhD: 4,
  DNP: 5,
};

const ChatGroupsType = {
  Shift: 1,
  Job: 2,
  General: 3,
};

const GraduationTypeArray = [
  {id: 1, name: 'Associate Degree in Nursing (ADN)', acronym: 'ADN'},
  {id: 2, name: 'Bachelor of Science in Nursing (BSN)', acronym: 'BSN'},
  {id: 5, name: 'Doctor of Nursing Practice (DNP)', acronym: 'DNP'},
  {id: 4, name: 'Doctor of Philosophy (PhD)', acronym: 'PhD'},
  {id: 3, name: 'Master of Science in Nursing (MSN)', acronym: 'MSN'},
];
const CredentialPriority = {
  High: 1,
  Low: 2,
};

const ScheduledShiftStatus = {
  OpenShift: 1,
  Scheduled: 2,
  InProgress: 3,
  Completed: 4,
  CalledOut: 5,
  NCNS: 6,
  Release: 7,
  Cancel: 8,
  Unschedule: 9,
  MissingClockIn: 10,
  MissingClockOut: 11,
  LateCall: 12,
  Overtime: 13,
  InviteSent: 14,
  InviteDeclined: 15,
  InviteWithdraw: 16,
};

const TimeSheetStatus = {
  Validated: 1,
  InReview: 2,
  NurseReview: 3,
  Rejected: 4,
};

const TimeSheetStatusList = [
  {name: 'Validated', id: 1},
  {name: 'In Review', id: 2},
  {name: 'Nurse Review', id: 3},
  {name: 'Rejected', id: 4},
];

const listSortShifts = [
  {id: 1, name: 'Start date', keyName: 'date'},
  {id: 2, name: 'Shift start hour', keyName: 'fromTime'},
  {id: 3, name: 'Facility name', keyName: 'hospitalName'},
  {id: 4, name: 'Break time', keyName: 'breakTime'},
  {id: 5, name: 'Total price', keyName: 'rate'},
  {id: 6, name: 'License Type', keyName: 'licenseType'},
];

const listWeekdays = [
  {id: 1, name: 'Monday'},
  {id: 2, name: 'Tuesday'},
  {id: 3, name: 'Wednesday'},
  {id: 4, name: 'Thursday'},
  {id: 5, name: 'Friday'},
  {id: 6, name: 'Saturday'},
  {id: 7, name: 'Sunday'},
];

const FilterByStatus = [
  {id: 1, name: 'All'},
  {id: 6, name: 'Hired'},
  {id: 8, name: 'Declined'},
  {id: 7, name: 'Withdrawn'},
  {id: 10, name: 'Rejected'},
];

const InProgressFilterArray = [
  {id: 1, name: 'All'},
  {id: 4, name: 'In Progress'},
  {id: 5, name: 'Pre-Boarding '},
];

const EmploymentFormEnum = {
  I9Form: 1,
  W4Form: 2,
  Other: 3,
};
const TimeSheetTabStatus = {AllTimeSheet: 1, ThisWeek: 2, ThisMonth: 3};

const jobRelatedNotifications = [
  'JobApplicationLicenseVerification',
  'JobApplicationCredentialsVerification',
  'JobApplicationDocumentVerification',
  'JobApplicationEmploymentFormVerification',
  'JobApplicationBackgroundCheckVerification',
  'JobApplication',
  'Rejected',
];
const scheduleRelatedNotifications = [
  'InviteNurse',
  'ShiftCancellation',
  'ShiftReminder',
  'ShiftReminderMissingClockIn',
  'ShiftReminderMissingClockOut',
  'ScheduledNurse',
  'InvitationWithdraw',
  'ShiftExtension',
];
const shiftRelatedNotifications = [
  'NewShift',
  'BoostShift',
  'NewLateCallShift',
];
const profileRelatedNotifications = [
  'LicenseVerification',
  'CredentialsVerification',
  'LicenseExpiration',
  'CredentialsExpiration',
  'BackgroundCheckVerification',
];

const MoreScreenData = [
  {
    id: 1,
    title: Strings.myProfile,
    nextIcon: Icons.next,
  },
  {
    id: 2,
    title: Strings.EmploymentForms,
    nextIcon: Icons.next,
  },
  {
    id: 3,
    title: Strings.shiftPreference,
    nextIcon: Icons.next,
  },
  {
    id: 5,
    title: Strings.notificationSettings,
    nextIcon: Icons.next,
  },
  {
    id: 6,
    title: Strings.DeleteAccount,
    nextIcon: Icons.next,
  },
  {
    id: 7,
    title: Strings.ContactUs,
    nextIcon: Icons.next,
  },
  {
    id: 8,
    title: Strings.Version,
  },
];

export const PageLimit = 10;
export {
  DateFormat,
  StatusInterView,
  JobDeclineStatus,
  JobStatus,
  InterviewStatus,
  ScreeningStatus,
  CredentialStatus,
  JobDocumentStatus,
  GraduationTypeStatus,
  GraduationTypeArray,
  ChatGroupsType,
  CredentialPriority,
  ScheduledShiftStatus,
  TimeSheetStatus,
  TimeSheetStatusList,
  listSortShifts,
  listWeekdays,
  FilterByStatus,
  InProgressFilterArray,
  TimeSheetTabStatus,
  EmploymentFormEnum,
  jobRelatedNotifications,
  scheduleRelatedNotifications,
  shiftRelatedNotifications,
  profileRelatedNotifications,
  Take,
  STAGE,
  DefaultOTPValue,
  USCountryCode,
  USCountryCodeWithFlag,
  PrivacyPolicyUrl,
  ContactUsMail,
  ContactUsMailSubject,
  MoreScreenData,
  camera_unavailable,
  iOSAppId,
  PROD,
  TAKE_TWENTY,
  OTP_TIMER_LIMIT,
  NurseAppChannel,
  EmploymentFormVerification,
  NonAlphaNumericRegex,
  TimesheetUpdate,
  Chat,
  facebook,
  Insta,
  Google,
  Apple,
  Fb,
  GET,
  ios,
  Android,
  BackgroundCheckName,
  CredentialTypeName,
};
