export type ClipData = {
  id: number;
  title: String;
  description: String;
  url: String;
  bookmarked: Boolean;
  tags: String[];
  archived: Boolean;
  user: String;
  createdAt: DateTime;
  updatedAt: DateTime;
};
