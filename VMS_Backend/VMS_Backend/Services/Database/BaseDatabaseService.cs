using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using VMS_Backend.Data;

namespace VMS_Backend.Services.Database
{
    public abstract class BaseDatabaseService<T> where T : class
    {
        protected readonly ApplicationDbContext _dbContext;
        
        protected BaseDatabaseService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Made not implemented for catching error
        /// when user forgot to override this
        /// </summary>
        /// <returns></returns>
        public List<T> GetAll()
        {
            return _dbContext.Set<T>().ToList();
        }

        /// <summary>
        /// Returns an item that was inserted in db
        /// </summary>
        /// <param name="item"></param>
        /// <returns>null if no item was inserted</returns>
        public virtual async Task<T> AddNewItem(T item)
        {
            var itemInDb = await _dbContext.AddAsync(item);
            var success = await SaveChangesAsync();
            return success ? itemInDb.Entity : null;
        }

        public virtual async Task<Boolean> DeleteItem(T item)
        {
            try
            {
                _dbContext.Remove(item);
                var success = await SaveChangesAsync();
                return success;
            }
            catch (DbUpdateConcurrencyException )
            {
                // No element was removed
                return false;
            }
        }

        /// <summary>
        /// Returns item found by it's identifier
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<T> FindItemByIdAsync(string id)
        {
            try
            {
                return await _dbContext.FindAsync<T>(id);
            }
            catch (ArgumentException)
            {
                var res = int.TryParse(id, out var intId);
                return res ? await _dbContext.FindAsync<T>(intId) : null;
            }
        }

        /// <summary>
        /// Returns true if delete of item is successful. Also updates the context
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteItemById(string id)
        {
            var item = await FindItemByIdAsync(id);
            _dbContext.Remove(item);
            return await SaveChangesAsync();
        }

        /// <summary>
        /// Returns true if updating context is successful
        /// </summary>
        /// <returns></returns>
        public async Task<bool> SaveChangesAsync()
        {
            try
            {
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("SaveChangesAsync: error: " + e.Message);
                return false;
            }
        }
    }
}