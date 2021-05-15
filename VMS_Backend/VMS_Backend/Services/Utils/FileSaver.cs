using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VMS_Backend.Data.Models;

namespace VMS_Backend.Services.Utils
{
    public static class FileSaver
    {
        private static readonly HashSet<string> ImageExtensions = new HashSet<string>() {"jpg", "jpeg", "png", "bmp"};

        public static bool IsImage(string path)
        {
            var fileName = path.Split("/").Last();
            var fileExtension = fileName.Split(".").Last();
            
            return ImageExtensions.Contains(fileExtension);
        }
        
        public static async Task<string> SaveFile(FileModel attachment)
        {
            try
            {
                var attachmentExtension = attachment.FileName.Split('.')[1];
                var fileName = $"{DateTime.Now.Ticks}.{attachmentExtension}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);
                
                await using var stream = new FileStream(path, FileMode.Create);
                await attachment.FormFile.CopyToAsync(stream);
                
                if (IsImage(path))
                {
                    fileName = await ImageResizer.ResizeImage(path);
                }

                return fileName;
            }
            catch (Exception)
            {
                // return null;
                throw;
            }
        }
    }
}