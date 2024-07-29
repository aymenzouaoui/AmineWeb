export interface Section
{
    _id?: string;
    title?: string;
    descriptionF?: string;
    descriptionS?: string;
    descriptionK?: string;
    colorLine?: string;
    codeBox?: string;
    formatOptions?: Partial<{
        colorLine: boolean;
        codeBox: boolean;
      }>;

}
