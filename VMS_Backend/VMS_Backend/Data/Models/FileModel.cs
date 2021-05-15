using Microsoft.AspNetCore.Http;

namespace VMS_Backend.Data.Models
{
    public class FileModel
    {
        public IFormFile FormFile { get; set; }
        public string FileName { get; set; }
    }
}