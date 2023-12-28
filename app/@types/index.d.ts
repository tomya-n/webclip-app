export type ClipData = {
  id: number;
  title: String;
  description: String;
  url: String;
  bookmarked: Boolean;
  tags: Tag[];
  archived: Boolean;
  user: String;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Tag = {
  id: number;
  name: String;
};
