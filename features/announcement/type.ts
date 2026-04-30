export type Announcement = {
    id: number;
    title: string;
    description: string;
    date_posted: Date;
    expiry_date: Date;
    category_id: number;
    attachment_url: string;
    priority: string;
}

export type AnnouncementCategory = {
    id: number;
    name: string;
    description: string;
}

export type AnnouncementWithCategory = Announcement & {
    announcement_category: AnnouncementCategory;
};