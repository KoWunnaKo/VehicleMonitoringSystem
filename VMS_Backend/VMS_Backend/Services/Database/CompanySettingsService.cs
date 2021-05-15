using System.Threading.Tasks;
using VMS_Backend.Data;
using VMS_Backend.Data.DatabaseModels;

namespace VMS_Backend.Services.Database
{
    public class CompanySettingsService : BaseDatabaseService<CompanySettings>
    {
        public CompanySettingsService(ApplicationDbContext dbContext) : base(dbContext) { }
        
        public async Task<CompanySettings> Edit(CompanySettings companySettings)
        {
            var dbCompanySettings = await _dbContext.FindAsync<CompanySettings>(companySettings.CompanyId);
            if (dbCompanySettings == null)
            {
                return null;
            }

            dbCompanySettings.AndroidIntervalRecording = companySettings.AndroidIntervalRecording;
            dbCompanySettings.AndroidIntervalSynchronization = companySettings.AndroidIntervalSynchronization;
            
            await _dbContext.SaveChangesAsync();
            return dbCompanySettings;
        }
    }
}