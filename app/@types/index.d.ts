export type ClipData = {
  id: number;
  title: string;
  description: string;
  url: string;
  bookmarked: Boolean;
  tags: Tag[];
  archived: Boolean;
  user: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Tag = {
  id: number;
  name: string;
};
