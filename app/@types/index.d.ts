export type ClipData = {
  id: number;
  title: String;
  description: String;
  url: String;
  bookmarked: Boolean;
  tag: String[];
  archived: Boolean;
  user: String;
  createdAt: DateTime;
  updatedAt: DateTime;
};
